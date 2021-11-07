import { CrudBaseBuilder } from './CrudBaseBuilder';
import { runNpmCommand } from '../utils';
import {
  QuestionOptionsInterface,
  frameworkType,
  PatternType,
} from '../interfaces';
import { FrameworkEnum, PatternEnum } from '../constants';
const fs = require('fs');

export class NestJsCrud {
  framework: FrameworkEnum.nestjs;
  nest_crud: boolean;
  pattern: string;
  model: any;
  constructor(
    model: any,
    options: Pick<QuestionOptionsInterface, 'pattern' | 'nest_crud'>
  ) {
    this.nest_crud = options.nest_crud;
    this.pattern = options.pattern;
    this.model = model;
    // super(options);
  }
  build({ controllerTemplate, serviceTemplate, moduleTemplate }) {
    this.createController(controllerTemplate);
  }
  createController(template) {
    let controllerFile =
      this.pattern === PatternEnum.ddd
        ? 'src/' +
          this.model.modelFile +
          '/' +
          this.model.modelFile +
          '.controller.ts'
        : `src/controllers/${this.model.modelFile}.controller.ts`;
    let tmp: string;
    if (this.nest_crud === true) {
      tmp = new template(this.model, this.pattern).nestJsCrud();
    } else {
      tmp = new template(this.model, this.pattern).nextJsCore();
    }
    if (this.pattern === PatternEnum.repository) {
      const controllerDir = 'src/controllers/';
      if (!fs.existsSync(controllerDir)) fs.mkdirSync(controllerDir);
    }
    const res = fs.writeFileSync(controllerFile, tmp, { encoding: 'utf8' });
    console.log('kreiran je konroller');
  }
  createService() {}
  createModule() {}
}
