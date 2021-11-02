import { QuestionOptionsInterface, PatternType } from '../interfaces';
import { runNpmCommand } from '../utils';
import fs from 'fs';
import path from 'path';
//('models/entities');

export class ModelsBuilder {
  public options: QuestionOptionsInterface;
  public modelsDirOrigin = path.join(__dirname, 'models/entities');
  public moduleTemplate = require('./templates/module');
  public serviceTemplate = require('./templates/service');
  public controllerTemplate = require('./templates/controller');

  constructor(options: QuestionOptionsInterface) {
    this.options = options;
    //  console.log(options, 'model builder');
  }

  init() {
    if (this.options.pattern === 'DDD') {
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

    runNpmCommand(
      `typeorm-model-generator -h ${host} -d ${db_name} -p ${db_port} -u ${user} -x ${password} -e ${engine} -o .`
    );
    // fs.readdir(this.modelsDirOrigin, function (err, files) {
    //   //handling error
    //   console.log(files);
    //   if (err) {
    //     return console.log('Unable to scan directory: ' + err);
    //   }
    //   //listing all files using forEach
    //   files.forEach(function (file) {
    //     this.resourceBuilder(file);
    //   });
    // });
  }
  resourceBuilder(file) {}
}
