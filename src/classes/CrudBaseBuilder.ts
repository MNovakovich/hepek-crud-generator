import { QuestionOptionsInterface, PatternType } from "../interfaces";
import { runNpmCommand } from "../utils";
import { EngineEnum, FrameworkEnum, PatternEnum } from "../constants";
import { ModuleTemplate } from "../templates/ModuleTemplate";
import { ControllerTemplate } from "../templates/ControllerTemplate";
import { ServiceTemplate } from "../templates/ServiceTemplate";
const fs = require("fs");
const path = require("path");
const replaceFile = require("replace-in-file");

export class CrudBaseBuilder {
  public oroginEntitiesDir = "./src/entities";
  public options: QuestionOptionsInterface;

  constructor(options: QuestionOptionsInterface, pattern) {
    this.options = options;
    console.log(options, "model builder");
  }

  init() {
    if (this.options.pattern === PatternEnum.ddd) {
      return;
    }
  }

  create() {
    const { host, db_name, db_port, user, password, engine, pattern } =
      this.options;

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
    const newDir = "./src/models";
    try {
      if (fs.existsSync(this.oroginEntitiesDir)) {
        fs.renameSync(this.oroginEntitiesDir, newDir);
      } else {
        console.log("Directory Entities does not exist.");
      }
    } catch (error) {}
  }

  private getModules(dir, callback) {
    const modules = [];
    fs.readdir(dir, function (err, files) {
      if (err) {
        return console.log("Unable to scan directory: " + err);
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
        return console.log("Unable to scan directory: " + err);
      }

      files.forEach(function (file) {
        that.resourceBuilder(file, files);
      });
    });
    this.removeOriginModelsFolder();
  }

  removeOriginModelsFolder() {
    const newDir = "./src/entities";
    fs.rmdir(newDir, { recursive: true }, (err) => {
      if (err) {
        throw err;
      }

      console.log(`${newDir} is deleted!`);
    });
  }
  resourceBuilder(file, files) {
    const modelName = file.split(".")[0];
    const entity = modelName.toLowerCase();
    const entityFile = entity + ".entity.ts";
    const moduleFile = entity + ".module.ts";
    //create new directory
    const dirName = "src/" + entity;

    if (!fs.existsSync(dirName)) {
      fs.mkdirSync(dirName);
    }

    // create new module file
    const moduleTmp = new ModuleTemplate(modelName).nextJs();
    const pth = path.join() + "/" + dirName + "/" + moduleFile;

    this.generateEntityFiels(dirName, file, entityFile);

    fs.writeFileSync(pth, moduleTmp, { encoding: "utf8" });
    const entityPath = dirName + "/" + entityFile;
    this.replaceEntityPaths(files, entityPath);

    // Create controllers
    const controllerTmp = new ControllerTemplate(modelName, "ddd").nextJsCore();
    const controllerPth = dirName + "/" + entity + ".controller.ts";
    fs.writeFileSync(controllerPth, controllerTmp, { encoding: "utf8" });
    // create services;
    this.createService(modelName);
  }

  createService(modelName) {
    const entity = modelName.toLowerCase();
    const serviceTmp = new ServiceTemplate(modelName, "ddd");
    let servicePth = "";
    if (this.options.pattern === PatternEnum.ddd) {
      servicePth = "src/" + entity + "/" + entity + ".service.ts";
    } else {
      const servicesDir = "src/services/";
      if (!fs.existsSync(servicesDir)) fs.mkdirSync(servicesDir);
      servicePth = "src/services/" + entity + ".service.ts";
    }
    const template = this.options.nest_crud
      ? serviceTmp.nestJsCrud()
      : serviceTmp.nextJsCore();
    fs.writeFileSync(servicePth, template, { encoding: "utf8" });
  }

  generateEntityFiels(dirName, file, entityFile) {
    fs.copyFile(
      this.oroginEntitiesDir + "/" + file,
      path.join() + "/" + dirName + "/" + entityFile,
      (error) => {
        if (error) {
          console.error(error);
          return;
        }
        console.log("Copied Successfully!");
      }
    );
  }

  async replaceEntityPaths(files, modelFile) {
    console.log(files);
    console.log(modelFile, "moodel file");
    try {
      let originModulePath = modelFile;
      const filesFromRaplace = files.map((file) => {
        let model = file.split(".")[0].toString();
        return `from "./${model}"`;
      });

      const filesToRaplace = files.map((file) => {
        let model = file.split(".")[0].toLowerCase().toString();
        return `from '../${model}/${model}.entity'`;
      });

      const options = {
        files: originModulePath.toString(),
        from: filesFromRaplace,
        to: filesToRaplace,
      };
      const results = await replaceFile(options);
    } catch (error) {
      console.log(error.message, " - error");
    }
  }
}
