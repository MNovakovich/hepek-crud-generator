"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerTemplate = void 0;
var ControllerBuilderCore = /** @class */ (function () {
    function ControllerBuilderCore() {
    }
    return ControllerBuilderCore;
}());
var ControllerTemplate = /** @class */ (function () {
    function ControllerTemplate(modelName) {
        this.modelName = modelName;
    }
    ControllerTemplate.prototype.nextJsCore = function () { };
    ControllerTemplate.prototype.nestJsCrud = function () {
        var moduleFile = this.modelName.toLowerCase() + '.entity.ts';
        var serviceFile = this.modelName.toLowerCase() + '.service.ts';
        return "\n    import { Controller } from \"@nestjs/common\";\n    import { Crud, CrudController } from \"@nestjsx/crud\";\n    import { ApiTags } from \"@nestjs/swagger\";\n    import { " + this.modelName + " } from './" + moduleFile + "';\n    import { " + this.modelName + "Service } from './" + serviceFile.slice(0, -3) + "';\n\n    @ApiTags('" + this.modelName + "')\n    @Crud({\n        model: {\n            type: " + this.modelName + ",\n        },\n    })\n    @Controller(\"" + this.modelName + "\")\n    export class " + this.modelName + "Controller implements CrudController<" + this.modelName + "> {\n    constructor(public service: " + this.modelName + "Service) {}\n    }\n   ";
    };
    ControllerTemplate.prototype.express = function () {
        console.log('createExpress');
    };
    return ControllerTemplate;
}());
exports.ControllerTemplate = ControllerTemplate;
//# sourceMappingURL=ControllerTemplate.js.map