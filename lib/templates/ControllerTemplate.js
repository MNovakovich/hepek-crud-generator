"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerTemplate = void 0;
var ControllerTemplate = /** @class */ (function () {
    function ControllerTemplate(modelName) {
        this.modelName = modelName;
    }
    ControllerTemplate.prototype.nextJsCore = function () { };
    ControllerTemplate.prototype.nestJsCrud = function () {
        var moduleFile = this.modelName.toLowerCase() + '.entity';
        var serviceFile = this.modelName.toLowerCase() + '.service';
        return "import { Controller } from \"@nestjs/common\";\nimport { Crud, CrudController } from \"@nestjsx/crud\";\nimport { ApiTags } from \"@nestjs/swagger\";\nimport { " + this.modelName + " } from './" + moduleFile + "';\nimport { " + this.modelName + "Service } from './" + serviceFile + "';\n\n@ApiTags('" + this.modelName + "')\n@Crud({\n  model: {\n    type: " + this.modelName + ",\n  },\n})\n@Controller('" + this.modelName + "')\nexport class " + this.modelName + "Controller implements CrudController<" + this.modelName + "> {\n  constructor(public service: " + this.modelName + "Service) {}\n}";
    };
    ControllerTemplate.prototype.express = function () {
        console.log('createExpress');
    };
    return ControllerTemplate;
}());
exports.ControllerTemplate = ControllerTemplate;
//# sourceMappingURL=ControllerTemplate.js.map