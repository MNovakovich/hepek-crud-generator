import { TemplateInterface } from './template.interface';

export class ControllerTemplate implements TemplateInterface {
  public modelName: string;
  constructor(modelName) {
    this.modelName = modelName;
  }

  nextJsCore() {
    const entity = this.modelName.toLocaleLowerCase();
    const serviceFile = './' + entity + '.service';
    return `import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    UseGuards,
  } from '@nestjs/common';
import { ${this.modelName}Service } from '${serviceFile}';
//import { CreatePostDto } from './dto/create-post.dto';
//import { UpdatePostDto } from './dto/update-post.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
@ApiTags('${entity}')
@Controller('${entity}')
export class ${this.modelName}Controller {
  constructor(private readonly ${entity}Service: ${this.modelName}Service) {}

  @Post()
  create(@Body() create${this.modelName}Dto: any) { // replace any with dto
    return this.${entity}Service.create(create${this.modelName}Dto);
  }

  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'orderBy', required: false })
  @Get()
  findAll(@Query() query?) {
    return this.${entity}Service.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.${entity}Service.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() update${entity}Dto: any) { // replace any with dto
    return this.${entity}Service.update(+id, update${entity}Dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.${entity}Service.remove(+id);
  }
}`;
  }
  nestJsCrud() {
    const moduleFile = this.modelName.toLowerCase() + '.entity';
    const serviceFile = this.modelName.toLowerCase() + '.service';
    return `import { Controller } from "@nestjs/common";
import { Crud, CrudController } from "@nestjsx/crud";
import { ApiTags } from "@nestjs/swagger";
import { ${this.modelName} } from './${moduleFile}';
import { ${this.modelName}Service } from './${serviceFile}';

@ApiTags('${this.modelName}')
@Crud({
  model: {
    type: ${this.modelName},
  },
})
@Controller('${this.modelName}')
export class ${this.modelName}Controller implements CrudController<${this.modelName}> {
  constructor(public service: ${this.modelName}Service) {}
}`;
  }
  express() {
    console.log('createExpress');
  }
}
