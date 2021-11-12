#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
var commands_1 = require("./commands");
var testdata_1 = __importDefault(require("./testdata"));
var ModelsBuilder_1 = require("./classes/ModelsBuilder");
var NestJsCrud_1 = require("./classes/NestJsCrud");
var ModuleTemplate_1 = require("./templates/ModuleTemplate");
var ServiceTemplate_1 = require("./templates/ServiceTemplate");
var ControllerTemplate_1 = require("./templates/ControllerTemplate");
var inquirer = require("inquirer");
var fs = require("fs");
var path = require("path");
var program = new commander_1.Command();
program.version("0.0.1");
var generateModels = new commands_1.GenerateModels(program, inquirer);
var models = new ModelsBuilder_1.ModelsBuilder(testdata_1.default);
models.create();
var modelsList = models.getModels();
modelsList.forEach(function (model) {
    var nestCrud = new NestJsCrud_1.NestJsCrud(model, {
        nest_crud: testdata_1.default.nest_crud,
        pattern: testdata_1.default.pattern,
    });
    nestCrud.build({
        moduleTemplate: ModuleTemplate_1.ModuleTemplate,
        serviceTemplate: ServiceTemplate_1.ServiceTemplate,
        controllerTemplate: ControllerTemplate_1.ControllerTemplate,
    });
});
// const dummyModel = { modelName: "TaskTag", modelFile: "task_tag" };
// const nestCrud = new NestJsCrud(dummyModel, {
//   nest_crud: dummyAnswers.nest_crud,
//   pattern: dummyAnswers.pattern,
// });
// nestCrud.build({
//   moduleTemplate: ModuleTemplate,
//   serviceTemplate: ServiceTemplate,
//   controllerTemplate: ControllerTemplate,
// });
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
//# sourceMappingURL=index.js.map