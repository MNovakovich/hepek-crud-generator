import { QuestionOptionsInterface } from '../interfaces';
import { PatternEnum } from '../constants';
import { runNpmCommand } from '../utils';
const fs = require('fs');
const path = require('path');
const replaceFile = require('replace-in-file');

export class ModelsBuilder {
  public originEntitiesDir = './src/entities';
  options: QuestionOptionsInterface;
  constructor(options: QuestionOptionsInterface) {
    this.options = options;
    console.log(options, 'model builder');
  }

  create() {
    this.generateModels();
    if (this.options.pattern == PatternEnum.ddd) {
      this.generateDomainFolders();
    } else {
      this.renameEntitiesFolder();
    }
  }
  private generateModels() {
    const { host, db_name, db_port, user, password, engine, pattern } =
      this.options;

    const status = runNpmCommand(
      `npx typeorm-model-generator -h ${host} -d ${db_name} -p ${db_port} -u ${user} -x ${password} -e ${engine} -o ./src`
    );
    if (status) return true;
    return false;
  }
  private renameEntitiesFolder(): void {
    const newDir = './src/models';
    try {
      if (fs.existsSync(this.originEntitiesDir)) {
        fs.renameSync(this.originEntitiesDir, newDir);
      } else {
        console.log('Directory Entities does not exist.');
      }
    } catch (error) {}
  }

  private generateDomainFolders() {
    const that = this;
    fs.readdir(this.originEntitiesDir, function (err, files) {
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
    fs.rmdir(this.originEntitiesDir, { recursive: true }, (err) => {
      if (err) {
        throw err;
      }

      console.log(`${this.originEntitiesDir} is deleted!`);
    });
  }
  resourceBuilder(file, files) {
    const modelName = file.split('.')[0];
    const entity = this.entityName(modelName);
    const entityFile = entity + '.entity.ts';

    //create new directory
    const dirName = 'src/' + entity;
    const entityFilePath = dirName + '/' + entityFile;
    if (!fs.existsSync(dirName)) {
      fs.mkdirSync(dirName);
    }

    this.generateEntityFiels(dirName, file, entityFile, (error) => {
      if (!error) this.replaceEntityPaths(files, entityFilePath);
    });
  }
  generateEntityFiels(dirName, file, entityFile, cb) {
    fs.copyFile(
      this.originEntitiesDir + '/' + file,
      path.join() + '/' + dirName + '/' + entityFile,
      (error) => {
        if (error) {
          cb(true);
          console.error(error);
          return;
        }
        cb(false);
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
        let model = this.entityName(file).toString();
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
  entityName(model: string): string {
    const nameArr = model.match(/[A-Z][a-z]+/g);
    return nameArr.join('_').toLowerCase();
  }

  static getModels(pattern: 'ddd' | 'repository') {
    if (pattern === PatternEnum.ddd) {
      const rootFolder = 'src/';
      const folders = fs.readdirSync(rootFolder);
      const data = [];
      const excluded = [
        'classes',
        'commands',
        'templates',
        'shared',
        'helpers',
        'entities',
      ];
      folders.forEach((file: string) => {
        const modelName = file.split('.')[0];
        const model = file;
        const folderName = `${rootFolder}${model}/`;

        if (fs.existsSync(folderName) && !excluded.includes(file)) {
          const modelArr = file.includes('_') && file.split('_');
          const model =
            typeof modelArr == 'object'
              ? modelArr
                  .map((item) => {
                    return item.charAt(0).toUpperCase() + item.substr(1);
                  })
                  .join('')
              : modelName.charAt(0).toUpperCase() + modelName.substr(1);

          data.push({
            modelName: model,
            modelFile: file,
          });
        }
      });
      return data;
    } else {
      const modelDir = 'src/models';
      const files = fs.readdirSync(modelDir);
      return files.map((file) => {
        const model = file.split('.')[0];
        return { modelName: model, modelFile: model };
      });
    }
  }
}
