"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleTemplate = void 0;
var ModuleTemplate = /** @class */ (function () {
    function ModuleTemplate(modelName) {
        this.modelName = modelName;
    }
    ModuleTemplate.prototype.nextJs = function () {
        var fileName = this.modelName.toLowerCase();
        return "\n        import { Module } from '@nestjs/common';\n        import { " + this.modelName + "Service } from './" + fileName + ".service';\n        import { " + this.modelName + "Controller } from './" + fileName + ".controller';\n        import { TypeOrmModule } from '@nestjs/typeorm';\n        import { " + this.modelName + " } from './" + fileName + ".entity';\n        \n        @Module({\n        imports: [TypeOrmModule.forFeature([ " + this.modelName + " ])],\n        controllers: [ " + this.modelName + "Controller],\n        providers: [" + this.modelName + "Service],\n        })\n        export class " + this.modelName + "Module {}\n            \n            ";
    };
    ModuleTemplate.prototype.express = function () {
        console.log('createExpress');
    };
    return ModuleTemplate;
}());
exports.ModuleTemplate = ModuleTemplate;
//# sourceMappingURL=ModuleTemplate.js.map