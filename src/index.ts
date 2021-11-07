#!/usr/bin/env node
import { CrudBaseBuilder } from './classes/CrudBaseBuilder';
import { Command, InvalidArgumentError } from 'commander';
import { GenerateModels } from './commands';
import { runNpmCommand } from './utils';
import dummyAnswers from './testdata';
import { ModelsBuilder } from './classes/ModelsBuilder';
import { NestJsCrud } from './classes/NestJsCrud';
import { ModuleTemplate } from './templates/ModuleTemplate';
import { ServiceTemplate } from './templates/ServiceTemplate';
import { ControllerTemplate } from './templates/ControllerTemplate';
var inquirer = require('inquirer');

const fs = require('fs');
const path = require('path');
const program = new Command();
program.version('0.0.1');

const generateModels = new GenerateModels(program, inquirer);
const models = new ModelsBuilder(dummyAnswers);
models.create();
const modelsList = models.getModels();
console.log(modelsList, 'model list');
const dummyModel = { modelName: 'TaskTag', modelFile: 'task_tag' };
const nestCrud = new NestJsCrud(dummyModel, {
  nest_crud: dummyAnswers.nest_crud,
  pattern: dummyAnswers.pattern,
});
nestCrud.build({
  moduleTemplate: ModuleTemplate,
  serviceTemplate: ServiceTemplate,
  controllerTemplate: ControllerTemplate,
});
// generateModels.create((answers) => {
//   //  execSync('npm install moment', { stdio: 'inherit', cwd: 'path/to/dir' });

//   return false;
//   if (answers.framework === 'nestjs') {
//     if (answers.nest_crud) {
//       runNpmCommand(
//         'npm i @nestjsx/crud @nestjsx/crud-request @nestjsx/crud-typeorm'
//       );
//     }
//     // console.log("create next crud");
//   } else if (answers.framework === 'expressjs') {
//     console.log('create expressjs');
//   }
// });

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
