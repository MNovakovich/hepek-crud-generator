"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerTemplate = void 0;
var helpers_1 = require("../helpers");
var ControllerTemplate = /** @class */ (function () {
    function ControllerTemplate(modelName) {
        this.modelName = modelName;
    }
    ControllerTemplate.prototype.nextJsCore = function () {
        var entity = (0, helpers_1.formatUpperCaseToUnderline)(this.modelName);
        var serviceFile = './' + entity + '.service';
        return "import {\n  Controller,\n  Get,\n  Post,\n  Body,\n  Patch,\n  Param,\n  Delete,\n  Query,\n} from '@nestjs/common';\n\nimport { " + this.modelName + "Service } from '" + serviceFile + "';\nimport { Create" + this.modelName + "Dto } from './dto/create-" + entity + ".dto';\nimport { Update" + this.modelName + "Dto } from './dto/update-" + entity + ".dto';\nimport { ApiQuery, ApiTags } from '@nestjs/swagger';\n@ApiTags('" + entity + "')\n@Controller('" + entity + "')\nexport class " + this.modelName + "Controller {\n  constructor(private readonly " + entity + "Service: " + this.modelName + "Service) {}\n\n  @Post()\n  create(@Body() body: Create" + this.modelName + "Dto) {\n    return this." + entity + "Service.create(body);\n  }\n\n  @ApiQuery({ name: 'page', required: false })\n  @ApiQuery({ name: 'orderBy', required: false })\n  @Get()\n  findAll(@Query() query?) {\n    return this." + entity + "Service.findAll(query);\n  }\n\n  @Get(':id')\n  findOne(@Param('id') id: string) {\n    return this." + entity + "Service.findOne(+id);\n  }\n\n  @Patch(':id')\n  update(@Param('id') id: string, @Body() data: Update" + this.modelName + "Dto) {\n    return this." + entity + "Service.update(+id, data);\n  }\n\n  @Delete(':id')\n  remove(@Param('id') id: string) {\n    return this." + entity + "Service.remove(+id);\n  }\n}";
    };
    ControllerTemplate.prototype.express = function () {
        console.log('createExpress');
    };
    return ControllerTemplate;
}());
exports.ControllerTemplate = ControllerTemplate;
//# sourceMappingURL=ControllerTemplate.js.map