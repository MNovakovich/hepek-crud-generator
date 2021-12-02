"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleTemplate = void 0;
var helpers_1 = require("../helpers");
var ModuleTemplate = /** @class */ (function () {
    function ModuleTemplate(modelName) {
        this.modelName = modelName;
    }
    ModuleTemplate.prototype.nextJs = function () {
        var fileName = (0, helpers_1.formatUpperCaseToUnderline)(this.modelName);
        return "import { Module } from '@nestjs/common';\nimport { " + this.modelName + "Service } from './" + fileName + ".service';\nimport { " + this.modelName + "Controller } from './" + fileName + ".controller';\nimport { SequelizeModule } from '@nestjs/sequelize';\nimport { " + this.modelName + " } from './" + fileName + ".entity';\n\n@Module({\n  imports: [SequelizeModule.forFeature([ " + this.modelName + " ])],\n  controllers: [" + this.modelName + "Controller],\n  providers: [" + this.modelName + "Service],\n})\nexport class " + this.modelName + "Module {}";
    };
    ModuleTemplate.prototype.express = function () {
        console.log('createExpress');
    };
    return ModuleTemplate;
}());
exports.ModuleTemplate = ModuleTemplate;
//# sourceMappingURL=ModuleTemplate.js.map