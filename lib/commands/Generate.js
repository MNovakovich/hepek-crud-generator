"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GenerateModels = /** @class */ (function () {
    function GenerateModels(program, inquirer) {
        //  console.log(inquirer)
        this.program = program;
        this.inquirer = inquirer;
    }
    GenerateModels.prototype.init = function () {
        var _this = this;
        this.program
            .command('generate:models <schematic> [name] [path]')
            .description('generate models based on database. For the time beign it just suport mysql engene.')
            .alias('gm')
            .action(function () { return _this.askForFramework(); });
        //this.program.parse(process.argv)
    };
    GenerateModels.prototype.askForFramework = function () {
        console.log(this.inquirer, 'ttttt');
        this.inquirer.prompt([
            {
                type: 'list',
                name: 'framework',
                message: "Which framewor do you want to use:",
                choices: ['NestJS', "ExpressJS"],
                //default: "false"
            },
            {
                type: 'list',
                name: 'pattern',
                message: "Which Structural Pattern you want to use:",
                choices: ['DDD', "Repository"],
                //default: "false"
            }
        ]);
    };
    return GenerateModels;
}());
exports.default = GenerateModels;
//# sourceMappingURL=Generate.js.map