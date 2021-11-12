#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
var commands_1 = require("./commands");
var ModelsBuilder_1 = require("./classes/ModelsBuilder");
var NestJsCrud_1 = require("./classes/NestJsCrud");
var ModuleTemplate_1 = require("./templates/ModuleTemplate");
var ServiceTemplate_1 = require("./templates/ServiceTemplate");
var ControllerTemplate_1 = require("./templates/ControllerTemplate");
var ModuleImporter_1 = require("./classes/ModuleImporter");
var inquirer = require('inquirer');
var fs = require('fs');
var path = require('path');
var program = new commander_1.Command();
program.version('0.0.1');
var generateModels = new commands_1.GenerateModels(program, inquirer);
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
generateModels.create(function (answers) {
    var models = new ModelsBuilder_1.ModelsBuilder(answers);
    models.create();
    console.log(ModelsBuilder_1.ModelsBuilder.getModels(answers.pattern.toLowerCase()), 'models');
});
var generateCrud = new commands_1.GenerateCrud(program, inquirer);
generateCrud.create(function (answers) {
    var models = ModelsBuilder_1.ModelsBuilder.getModels(answers.pattern.toLowerCase());
    console.log(models);
    if (models.length === 0) {
        console.log('ne postoje modeli');
        return false;
    }
    models.forEach(function (model) {
        var nestCrud = new NestJsCrud_1.NestJsCrud(model, {
            nest_crud: answers.nest_crud,
            pattern: answers.pattern,
        });
        nestCrud.build({
            moduleTemplate: ModuleTemplate_1.ModuleTemplate,
            serviceTemplate: ServiceTemplate_1.ServiceTemplate,
            controllerTemplate: ControllerTemplate_1.ControllerTemplate,
        });
    });
    new ModuleImporter_1.ModuleExporter.add(models);
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
//# sourceMappingURL=index.js.map