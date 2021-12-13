#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ModelsBuilder_1 = require("./classes/ModelsBuilder");
var commander_1 = require("commander");
var commands_1 = require("./commands");
var inquirer = require('inquirer');
var fs = require('fs');
var path = require('path');
var program = new commander_1.Command();
program.version('0.0.1');
//console.log(path.join(__dirname) +"../../.."  )
// models.create();
//console.log(models.modelFiles);
var generateModels = new commands_1.GenerateModels(program, inquirer);
generateModels.create(function (answers) {
    //  execSync('npm install moment', { stdio: 'inherit', cwd: 'path/to/dir' });
    var models = new ModelsBuilder_1.ModelsBuilder(answers);
    models.create();
});
program.parse(process.argv);
/**
 *
 * //console.log(path.join(__dirname) +"../../.."  )

// const modules = ['UserModule', 'RoleModule'];
// const stream = fs.createWriteStream('./src/exported-domains.ts', {
//   overwrite: false,
//   flags: 'a',
// });

// modules.forEach((item) => {
//   const template = `import {${item} } from './${item}.module';\n`;
//   stream.write(template);
// });

// stream.write(`export default [\n`);
// modules.forEach((item) => {
//   const template = `${item},\n`;
//   stream.write(template);
// });
// stream.write(']');
// stream.end();

 */
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