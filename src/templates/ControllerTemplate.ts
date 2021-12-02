import { TemplateInterface } from './template.interface';
import { formatUpperCaseToUnderline } from '../helpers';

export class ControllerTemplate implements TemplateInterface {
  public modelName: string;
  constructor(modelName: any) {
    this.modelName = modelName;
  }

  nextJsCore() {
    const entity = formatUpperCaseToUnderline(this.modelName);
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
} from '@nestjs/common';

import { ${this.modelName}Service } from '${serviceFile}';
import { Create${this.modelName}Dto } from './dto/create-${entity}.dto';
import { Update${this.modelName}Dto } from './dto/update-${entity}.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
@ApiTags('${entity}')
@Controller('${entity}')
export class ${this.modelName}Controller {
  constructor(private readonly ${entity}Service: ${this.modelName}Service) {}

  @Post()
  create(@Body() body: Create${this.modelName}Dto) {
    return this.${entity}Service.create(body);
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
  update(@Param('id') id: string, @Body() data: Update${this.modelName}Dto) {
    return this.${entity}Service.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.${entity}Service.remove(+id);
  }
}`;
  }
  express() {
    console.log('createExpress');
  }
}
