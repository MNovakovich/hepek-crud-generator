"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerTemplate = void 0;
var constants_1 = require("../constants");
var ControllerTemplate = /** @class */ (function () {
    function ControllerTemplate(model, pattern) {
        this.modelName = model.modelName;
        this.modelFile = model.modelFile;
        this.pattern = pattern;
        this.serviceFile =
            pattern === constants_1.PatternEnum.ddd
                ? './' + model.modelFile + '.service'
                : '../services/' + this.modelFile + '.service';
    }
    ControllerTemplate.prototype.nextJsCore = function () {
        var entity = this.modelFile; // this.modelName.toLocaleLowerCase();
        return "import {\n    Controller,\n    Get,\n    Post,\n    Body,\n    Patch,\n    Param,\n    Delete,\n    Query,\n    UseGuards,\n  } from '@nestjs/common';\nimport { " + this.modelName + "Service } from '" + this.serviceFile + "';\n//import { CreatePostDto } from './dto/create-post.dto';\n//import { UpdatePostDto } from './dto/update-post.dto';\nimport { ApiQuery, ApiTags } from '@nestjs/swagger';\n@ApiTags('" + entity + "')\n@Controller('" + entity + "')\nexport class " + this.modelName + "Controller {\n  constructor(private readonly " + entity + "Service: " + this.modelName + "Service) {}\n\n  @Post()\n  create(@Body() create" + this.modelName + "Dto: any) { // replace any with dto\n    return this." + entity + "Service.create(create" + this.modelName + "Dto);\n  }\n\n  @ApiQuery({ name: 'page', required: false })\n  @ApiQuery({ name: 'orderBy', required: false })\n  @Get()\n  findAll(@Query() query?) {\n    return this." + entity + "Service.findAll(query);\n  }\n\n  @Get(':id')\n  findOne(@Param('id') id: string) {\n    return this." + entity + "Service.findOne(+id);\n  }\n\n  @Patch(':id')\n  update(@Param('id') id: string, @Body() update" + entity + "Dto: any) { // replace any with dto\n    return this." + entity + "Service.update(+id, update" + entity + "Dto);\n  }\n\n  @Delete(':id')\n  remove(@Param('id') id: string) {\n    return this." + entity + "Service.remove(+id);\n  }\n}";
    };
    ControllerTemplate.prototype.nestJsCrud = function () {
        var model = this.pattern === constants_1.PatternEnum.ddd
            ? './' + this.modelFile + '.entity'
            : '../models/' + this.modelName;
        return "import { Controller } from \"@nestjs/common\";\nimport { Crud, CrudController } from \"@nestjsx/crud\";\nimport { ApiTags } from \"@nestjs/swagger\";\nimport { " + this.modelName + " } from '" + model + "';\nimport { " + this.modelName + "Service } from '" + this.serviceFile + "';\n\n@ApiTags('" + this.modelName + "')\n@Crud({\n  model: {\n    type: " + this.modelName + ",\n  },\n})\n@Controller('" + this.modelName + "')\nexport class " + this.modelName + "Controller implements CrudController<" + this.modelName + "> {\n  constructor(public service: " + this.modelName + "Service) {}\n}";
    };
    ControllerTemplate.prototype.express = function () {
        console.log('createExpress');
    };
    return ControllerTemplate;
}());
exports.ControllerTemplate = ControllerTemplate;
//# sourceMappingURL=ControllerTemplate.js.map