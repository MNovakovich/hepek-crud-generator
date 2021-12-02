"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerTemplate = void 0;
var ControllerTemplate = /** @class */ (function () {
    function ControllerTemplate(modelName) {
        this.modelName = modelName;
    }
    ControllerTemplate.prototype.nextJsCore = function () {
        var entity = this.modelName.toLocaleLowerCase();
        var serviceFile = './' + entity + '.service';
        return "import {\n    Controller,\n    Get,\n    Post,\n    Body,\n    Patch,\n    Param,\n    Delete,\n    Query,\n    UseGuards,\n  } from '@nestjs/common';\n\nimport { " + this.modelName + "Service } from '" + serviceFile + "';\n//import { CreatePostDto } from './dto/create-post.dto';\n//import { UpdatePostDto } from './dto/update-post.dto';\nimport { ApiQuery, ApiTags } from '@nestjs/swagger';\n@ApiTags('" + entity + "')\n@Controller('" + entity + "')\nexport class " + this.modelName + "Controller {\n  constructor(private readonly " + entity + "Service: " + this.modelName + "Service) {}\n\n  @Post()\n  create(@Body() create" + this.modelName + "Dto: any) { // replace any with dto\n    return this." + entity + "Service.create(create" + this.modelName + "Dto);\n  }\n\n  @ApiQuery({ name: 'page', required: false })\n  @ApiQuery({ name: 'orderBy', required: false })\n  @Get()\n  findAll(@Query() query?) {\n    return this." + entity + "Service.findAll(query);\n  }\n\n  @Get(':id')\n  findOne(@Param('id') id: string) {\n    return this." + entity + "Service.findOne(+id);\n  }\n\n  @Patch(':id')\n  update(@Param('id') id: string, @Body() update" + entity + "Dto: any) { // replace any with dto\n    return this." + entity + "Service.update(+id, update" + entity + "Dto);\n  }\n\n  @Delete(':id')\n  remove(@Param('id') id: string) {\n    return this." + entity + "Service.remove(+id);\n  }\n}";
    };
    ControllerTemplate.prototype.express = function () {
        console.log('createExpress');
    };
    return ControllerTemplate;
}());
exports.ControllerTemplate = ControllerTemplate;
//# sourceMappingURL=ControllerTemplate.js.map