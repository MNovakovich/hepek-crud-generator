#!/usr/bin/env node
import { CrudBaseBuilder } from './classes/CrudBaseBuilder';
import { Command, InvalidArgumentError } from 'commander';
import { GenerateModels, GenerateCrud } from './commands';
import { runNpmCommand } from './utils';
import dummyAnswers from './testdata';
import { ModelsBuilder } from './classes/ModelsBuilder';
import { NestJsCrud } from './classes/NestJsCrud';
import { ModuleTemplate } from './templates/ModuleTemplate';
import { ServiceTemplate } from './templates/ServiceTemplate';
import { ControllerTemplate } from './templates/ControllerTemplate';
import { ModuleExporter } from './classes/ModuleImporter';
var inquirer = require('inquirer');

const fs = require('fs');
const path = require('path');
const program = new Command();
program.version('0.0.1');

const generateModels = new GenerateModels(program, inquirer);

//models.create();

//const modelsList = models.getModels();

// modelsList.forEach((model) => {
//   const nestCrud = new NestJsCrud(model, {
//     nest_crud: dummyAnswers.nest_crud,
//     pattern: dummyAnswers.pattern,
//   });
//   nestCrud.build({
//     moduleTemplate: ModuleTemplate,
//     serviceTemplate: ServiceTemplate,
//     controllerTemplate: ControllerTemplate,
//   });
// });
// const dummyModel = { modelName: "TaskTag", modelFile: "task_tag" };

generateModels.create((answers) => {
  const models = new ModelsBuilder(answers);
  models.create();
  console.log(ModelsBuilder.getModels(answers.pattern.toLowerCase()), 'models');
});
const generateCrud = new GenerateCrud(program, inquirer);

generateCrud.create((answers) => {
  const models = ModelsBuilder.getModels(answers.pattern.toLowerCase());
  console.log(models);
  if (models.length === 0) {
    console.log('ne postoje modeli');
    return false;
  }
  models.forEach((model) => {
    const nestCrud = new NestJsCrud(model, {
      nest_crud: answers.nest_crud,
      pattern: answers.pattern,
    });
    nestCrud.build({
      moduleTemplate: ModuleTemplate,
      serviceTemplate: ServiceTemplate,
      controllerTemplate: ControllerTemplate,
    });
  });
  new ModuleExporter.add(models);
});
program.parse(process.argv);

// function myParseInt(value, dummyPrevious) {
//     // parseInt takes a string and a radix
//     const parsedValue = parseInt(value, 10);
//     if (isNaN(parsedValue)) {
//       throw new commander.InvalidArgumentError('Not a number.');
//     }
//     return parsedValue;
//   }

//   function increaseVerbosity(dummyValue, previous) {
//     return previous + 1;
//   }

//   function collect(value, previous) {
//     return previous.concat([value]);
//   }

//   function commaSeparatedList(value, dummyPrevious) {
//     return value.split(',');
//   }

//   program
//     .option('-f, --float <number>', 'float argument', parseFloat)
//     .option('-i, --integer <number>', 'integer argument', myParseInt)
//     .option('-v, --verbose', 'verbosity that can be increased', increaseVerbosity, 0)
//     .option('-c, --collect <value>', 'repeatable value', collect, [])
//     .option('-l, --list <items>', 'comma separated list', commaSeparatedList)
//   ;

//   program.parse();

//   const options = program.opts();
//   if (options.float !== undefined) console.log(`float: ${options.float}`);
//   if (options.integer !== undefined) console.log(`integer: ${options.integer}`);
//   if (options.verbose > 0) console.log(`verbosity: ${options.verbose}`);
//   if (options.collect.length > 0) console.log(options.collect);
//   if (options.list !== undefined) console.log(options.list);
