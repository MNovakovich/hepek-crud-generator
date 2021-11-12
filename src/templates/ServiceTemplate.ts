import { TemplateInterface } from './template.interface';
import { PatternEnum } from '../constants';
export class ServiceTemplate implements TemplateInterface {
  public modelName: string;
  public modelFile: string;
  public pattern: string;
  public entityFile: string;
  constructor(model, pattern) {
    // super(modelName);
    this.modelName = model.modelName;
    this.pattern = pattern;
    this.modelFile =
      pattern === PatternEnum.ddd
        ? './' + model.modelFile + '.entity'
        : '../models/' + model.modelFile;
    this.entityFile = model.modelFile;
  }

  nextJsCore() {
    const entity = this.entityFile;
    return `import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationResponse,
  pagination,
} from 'nest-crud-hepek/lib/pagination';
import { Repository } from 'typeorm';
import { Create${this.modelName}Dto } from './dto/create-${entity}.dto';
import { Update${this.modelName}Dto } from './dto/update-${entity}.dto';
import { ${this.modelName} } from '${this.modelFile}';

@Injectable()
export class ${this.modelName}Service {
  constructor(
    @InjectRepository(${this.modelName}) private ${entity}Repository: Repository<any>,
  ) {}
  async create(create${this.modelName}Dto: Create${this.modelName}Dto) {
    const result = await this.${entity}Repository.create({ create${this.modelName}Dto });
    return await this.${entity}Repository.save(result);
  }

  async findAll(query): Promise<IPaginationResponse<${this.modelName}>> {
    const options = {
      offset: 2,
      page: query.page,
    };
    return await pagination(this.${entity}Repository, options);
  }

  findOne(id: number) {
    return this.${entity}Repository.findOne({ where: { id } });
  }

  async update(id: number, update${this.modelName}Dto: Update${this.modelName}Dto): Promise<any> {
    const result = await this.${entity}Repository.findOne({ where: { id } });
    if (!result) {
      throw new ConflictException("${entity} doesn't exist");
    }
    return this.${entity}Repository.update(id, {
      ...result,
      ...update${this.modelName}Dto,
    });
  }

  remove(id: number) {
    return this.${this.entityFile}Repository.delete(id);
  }
}`;
  }
  nestJsCrud() {
    const entity = this.modelName.toLowerCase() + '.entity';
    return `import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { ${this.modelName} } from './${entity}';

@Injectable()
export class ${this.modelName}Service extends TypeOrmCrudService<${this.modelName}> {
  constructor(@InjectRepository(${this.modelName}) repo) {
    super(repo);
  }
}
`;
  }
  express() {
    console.log('createExpress');
  }
}
