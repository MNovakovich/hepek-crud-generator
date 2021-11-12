import { TemplateInterface } from './template.interface';
import { PatternEnum } from '../constants';
export class ControllerTemplate implements TemplateInterface {
  public modelName: string;
  public modelFile: string;
  public pattern: string;
  public serviceFile: string;

  constructor(model, pattern) {
    this.modelName = model.modelName;
    this.modelFile = model.modelFile;
    this.pattern = pattern;
    this.serviceFile =
      pattern === PatternEnum.ddd
        ? './' + model.modelFile + '.service'
        : '../services/' + this.modelFile + '.service';
  }

  nextJsCore() {
    const entity = this.modelFile; // this.modelName.toLocaleLowerCase();
    const model =
      this.pattern === PatternEnum.ddd
        ? './' + this.modelFile + '.entity'
        : '../models/' + this.modelName;

    return `import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ${this.modelName}Service } from '${this.serviceFile}';
import { Create${this.modelName}Dto } from './dto/create-${this.modelFile}.dto';
import { Update${this.modelName}Dto } from './dto/update-${this.modelFile}.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
@ApiTags('${entity}')
@Controller('${entity}')
export class ${this.modelName}Controller {
  constructor(private readonly ${entity}Service: ${this.modelName}Service) {}

  @Post()
  create(@Body() create${this.modelName}Dto: Create${this.modelName}Dto) {
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
  update(@Param('id') id: string, @Body() update${entity}Dto: Update${this.modelName}Dto) {
    return this.${entity}Service.update(+id, update${entity}Dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.${entity}Service.remove(+id);
  }
}`;
  }
  nestJsCrud() {
    const model =
      this.pattern === PatternEnum.ddd
        ? './' + this.modelFile + '.entity'
        : '../models/' + this.modelName;

    return `import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { ApiTags } from '@nestjs/swagger';
import { ${this.modelName} } from '${model}';
import { ${this.modelName}Service } from '${this.serviceFile}';

@ApiTags('${this.modelName}')
@Crud({
  model: {
    type: ${this.modelName},
  },
})
@Controller('${this.modelName}')
export class ${this.modelName}Controller implements CrudController<${this.modelName}> {
  constructor(public service: ${this.modelName}Service) {}
}
`;
  }
  express() {
    console.log('createExpress');
  }
}
