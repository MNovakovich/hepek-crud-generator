import { QuestionOptionsInterface, PatternType } from '../interfaces';
import { runNpmCommand } from '../utils';
import { EngineEnum, FrameworkEnum, PatternEnum } from '../constants';
import { ModuleTemplate } from '../templates/ModuleTemplate';
import { ControllerTemplate } from '../templates/ControllerTemplate';
import { ServiceTemplate } from '../templates/ServiceTemplate';
const fs = require('fs');
const path = require('path');
const replaceFile = require('replace-in-file');

export class ModelsBuilder {
  public oroginEntitiesDir = './entities';
  public modelFiles = [];
  public options: QuestionOptionsInterface;

  constructor(options: QuestionOptionsInterface) {
    this.options = options;
    console.log(options, 'model builder');
  }

  init() {}

  create() {
    const { host, db_name, db_port, user, password, engine } = this.options;

    runNpmCommand(
      `npx stg -D ${engine} -h  ${host} -p  ${db_port} -d ${db_name} -u ${user}  -x ${password} --indices --dialect-options-file  --case camel --out-dir ${this.oroginEntitiesDir}`
    );

    this.generateDomainFolders();
  }

  public getModules(dir, callback) {
    const modules = [];
    fs.readdir(dir, function (err, files) {
      if (err) {
        return console.log('Unable to scan directory: ' + err);
      }

      files.forEach(function (file) {
        modules.push(file);
      });
    });
  }
  private generateDomainFolders() {
    const that = this;
    fs.readdir(this.oroginEntitiesDir, function (err, files) {
      if (err) {
        return console.log('Unable to scan directory: ' + err);
      }

      files.forEach(function (file) {
        that.resourceBuilder(file, files);
      });
    });
    this.removeOriginModelsFolder();
  }

  removeOriginModelsFolder() {
    fs.rmdir(this.oroginEntitiesDir, { recursive: true }, (err) => {
      if (err) {
        throw err;
      }

      console.log(`${this.oroginEntitiesDir} is deleted!`);
    });
  }
  resourceBuilder(file, files) {
    const modelName = file.split('.')[0];
    const entity = modelName.toLowerCase();
    const entityFile = entity + '.entity.ts';
    const moduleFile = entity + '.module.ts';
    //create new directory
    if (entity === 'index') return false;
    const dirName = 'src/domains/' + entity;

    if (!fs.existsSync(dirName)) {
      fs.mkdirSync(dirName);
    }

    // create new module file
    const moduleTmp = new ModuleTemplate(modelName).nextJs();
    const pth = path.join() + '/' + dirName + '/' + moduleFile;

    this.generateEntityFiels(dirName, file, entityFile);

    fs.writeFileSync(pth, moduleTmp, { encoding: 'utf8' });
    const entityPath = dirName + '/' + entityFile;
    this.replaceEntityPaths(files, entityPath);

    // Create controllers
    const controllerTmp = new ControllerTemplate(modelName).nextJsCore();
    const controllerPth = dirName + '/' + entity + '.controller.ts';
    fs.writeFileSync(controllerPth, controllerTmp, { encoding: 'utf8' });
    // create services;
    this.createService(modelName);
  }

  createService(modelName) {
    const entity = modelName.toLowerCase();
    const serviceTmp = new ServiceTemplate(modelName);
    let servicePth = 'src/domains/' + entity + '/' + entity + '.service.ts';

    const template = serviceTmp.nextJsCore();
    fs.writeFileSync(servicePth, template, { encoding: 'utf8' });
  }

  generateEntityFiels(dirName, file, entityFile) {
    fs.copyFile(
      this.oroginEntitiesDir + '/' + file,
      path.join() + '/' + dirName + '/' + entityFile,
      (error) => {
        if (error) {
          console.error(error);
          return;
        }
        console.log('Copied Successfully!');
      }
    );
  }

  async replaceEntityPaths(files, modelFile) {
    try {
      let originModulePath = modelFile;
      const filesFromRaplace = files.map((file) => {
        let model = file.split('.')[0].toString();
        return `from "./${model}"`;
      });

      const filesToRaplace = files.map((file) => {
        let model = file.split('.')[0].toLowerCase().toString();
        return `from '../${model}/${model}.entity'`;
      });

      const options = {
        files: originModulePath.toString(),
        from: filesFromRaplace,
        to: filesToRaplace,
      };
      const results = await replaceFile(options);
    } catch (error) {
      console.log(error.message, ' - error');
    }
  }
}
