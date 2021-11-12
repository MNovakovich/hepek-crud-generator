"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleTemplate = void 0;
var ModuleTemplate = /** @class */ (function () {
    function ModuleTemplate(modelName) {
        this.modelName = modelName;
    }
    ModuleTemplate.prototype.nextJs = function () {
        var fileName = this.modelName.toLowerCase();
        return "import { Module } from '@nestjs/common';\nimport { " + this.modelName + "Service } from './" + fileName + ".service';\nimport { " + this.modelName + "Controller } from './" + fileName + ".controller';\nimport { TypeOrmModule } from '@nestjs/typeorm';\nimport { " + this.modelName + " } from './" + fileName + ".entity';\n\n@Module({\n  imports: [TypeOrmModule.forFeature([ " + this.modelName + " ])],\n  controllers: [" + this.modelName + "Controller],\n  providers: [" + this.modelName + "Service],\n})\nexport class " + this.modelName + "Module {}";
    };
    ModuleTemplate.prototype.express = function () {
        console.log("createExpress");
    };
    return ModuleTemplate;
}());
exports.ModuleTemplate = ModuleTemplate;
//# sourceMappingURL=ModuleTemplate.js.map