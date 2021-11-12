import { CrudBaseBuilder } from "./CrudBaseBuilder";
import { runNpmCommand } from "../utils";
import {
  QuestionOptionsInterface,
  frameworkType,
  PatternType,
} from "../interfaces";
import { FrameworkEnum, PatternEnum } from "../constants";
const fs = require("fs");

export class NestJsCrud {
  framework: FrameworkEnum.nestjs;
  nest_crud: boolean;
  pattern: string;
  model: any;
  constructor(
    model: any,
    options: Pick<QuestionOptionsInterface, "pattern" | "nest_crud">
  ) {
    this.nest_crud = options.nest_crud;
    this.pattern = options.pattern;
    this.model = model;
    // super(options);
  }
  build({ controllerTemplate, serviceTemplate, moduleTemplate }) {
    this.createController(controllerTemplate);
    this.createService(serviceTemplate);
  }
  createController(template) {
    let controllerFile =
      this.pattern === PatternEnum.ddd
        ? "src/" +
          this.model.modelFile +
          "/" +
          this.model.modelFile +
          ".controller.ts"
        : `src/controllers/${this.model.modelFile}.controller.ts`;
    let tmp: string;
    if (this.nest_crud === true) {
      tmp = new template(this.model, this.pattern).nestJsCrud();
    } else {
      tmp = new template(this.model, this.pattern).nextJsCore();
    }
    if (this.pattern === PatternEnum.repository) {
      const controllerDir = "src/controllers/";
      if (!fs.existsSync(controllerDir)) fs.mkdirSync(controllerDir);
    }
    const res = fs.writeFileSync(controllerFile, tmp, { encoding: "utf8" });
    console.log("kreiran je konroller");
  }
  createService(template) {
    //this.createDtoFile("update");
    let controllerFile =
      this.pattern === PatternEnum.ddd
        ? "src/" +
          this.model.modelFile +
          "/" +
          this.model.modelFile +
          ".service.ts"
        : `src/services/${this.model.modelFile}.service.ts`;
    let tmp: string;
    if (this.nest_crud === true) {
      tmp = new template(this.model, this.pattern).nestJsCrud();
    } else {
      tmp = new template(this.model, this.pattern).nextJsCore();
    }
    if (this.pattern === PatternEnum.repository) {
      const controllerDir = "src/services/";
      if (!fs.existsSync(controllerDir)) fs.mkdirSync(controllerDir);
    }
    const res = fs.writeFileSync(controllerFile, tmp, { encoding: "utf8" });
    this.createDtoFile("create");
    this.createDtoFile("update");
  }
  createModule() {}
  createDtoFile(prefix: "create" | "update") {
    const dtoFolder =
      this.pattern === PatternEnum.ddd
        ? "src/" + this.model.modelFile + `/dto/`
        : `src/dto/`;
    if (!fs.existsSync(dtoFolder)) fs.mkdirSync(dtoFolder);
    const dtoCreateFile =
      this.pattern === PatternEnum.ddd
        ? "src/" +
          this.model.modelFile +
          `/dto/${prefix}-` +
          this.model.modelFile +
          ".dto.ts"
        : `src/dto/${prefix}-${this.model.modelFile.toLowerCase()}.dto.ts`;

    const res = fs.writeFileSync(dtoCreateFile, this.dtoTempate(prefix), {
      encoding: "utf8",
    });
  }

  dtoTempate(prefix: "create" | "update") {
    const classPrefix = prefix.charAt(0).toUpperCase() + prefix.slice(1);
    return `//import { ApiProperty } from '@nestjs/swagger';
// import { IsString, MaxLength } from 'class-validator';

export class ${classPrefix}${this.model.modelName}Dto {}`;
  }
}
