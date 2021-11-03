import { QuestionOptionsInterface, PatternType } from '../interfaces';
import { runNpmCommand } from '../utils';
import { EngineEnum, PatternEnum } from '../constants';
import { ModuleTemplate } from '../templates/ModuleTemplate';
import fs from 'fs';
import path from 'path';
//('models/entities');

export class ModelsBuilder {
  public oroginEntitiesDir = './src/entities';
  public modelFiles = [];
  public options: QuestionOptionsInterface;
  //   public modelsDirOrigin = path.join(__dirname, 'models/entities');
  //   public moduleTemplate = require('./templates/module');
  //   public serviceTemplate = require('./templates/service');
  //   public controllerTemplate = require('./templates/controller');

  constructor(options: QuestionOptionsInterface) {
    this.options = options;
    console.log(options, 'model builder');
  }

  init() {
    if (this.options.pattern === PatternEnum.ddd) {
      return;
    }
  }
  /**
 * 
 *   host: string;
  db_name: string;
  db_port: number;
  user: string;
  password: string;
  engine: string | EngineType;
  framework: string;
  pattern: string | PatternType;
  next_crud?: boolean;
 */
  create() {
    const { host, db_name, db_port, user, password, engine, pattern } =
      this.options;
    // console.log(
    //   { host, db_name, db_port, user, password, engine, pattern },
    //   'saaaaaa'
    // );
    runNpmCommand(
      `npx typeorm-model-generator -h ${host} -d ${db_name} -p ${db_port} -u ${user} -x ${password} -e ${engine} -o ./src`
    );
    if (pattern == PatternEnum.ddd) {
      this.generateDomainFolders();
    } else {
      this.renameEntitiesFolder();
    }
  }

  private renameEntitiesFolder(): void {
    const newDir = './src/models';
    try {
      if (fs.existsSync(this.oroginEntitiesDir)) {
        fs.renameSync(this.oroginEntitiesDir, newDir);
      } else {
        console.log('Directory Entities does not exist.');
      }
    } catch (error) {}
  }
  private generateDomainFolders() {
    const that = this;
    fs.readdir(this.oroginEntitiesDir, function (err, files) {
      if (err) {
        return console.log('Unable to scan directory: ' + err);
      }

      //listing all files using forEach
      files.forEach(function (file) {
        that.resourceBuilder(file, files);
      });
    });
  }
  resourceBuilder(file, files) {
    const modelName = file.split('.')[0];
    const entity = modelName.toLowerCase();
    const entityFile = entity + '.entity.ts';
    const moduleFile = entity + '.module.ts';
    const serviceFile = entity + '.service.ts';
    const controllerFile = entity + '.controller.ts';
    //create new directory
    const dirName = 'src/' + entity;

    const moduleTmp = new ModuleTemplate(modelName).nextJs();
    const pth = path.join() + '/' + dirName + '/' + entityFile;
    console.log(pth);
    fs.writeFile(pth, moduleTmp, function (err) {
      if (err) return console.log(err);
    });

    // const serviceTmp = serviceTemplate(moduleName, entityFile)
    // const controllerTmp = controllerTemplate(moduleName, entityFile, serviceFile);
    // let originModulePath = modulesDir + '/' + file;

    if (!fs.existsSync(dirName)) {
      fs.mkdirSync(dirName);
    }
  }
}
