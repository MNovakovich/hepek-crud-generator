import { TemplateInterface } from './template.interface';

export class ServiceTemplate implements TemplateInterface {
  modelName: string;
  constructor(modelName) {
    // super(modelName);
    this.modelName = modelName;
  }

  nextJsCore() {
    const entity = this.modelName.toLocaleLowerCase();
    const entityFile = entity + '.entity';
    return `import { ConflictException, Injectable } from '@nestjs/common';
    import { InjectRepository } from '@nestjs/typeorm';
    import { IPaginationResponse, pagination } from 'src/shered/helpers/pagination';
    import { Repository } from 'typeorm';
    import { CreatePostDto } from './dto/create-post.dto';
    import { UpdatePostDto } from './dto/update-post.dto';
    import { ${this.modelName} } from '${entityFile}';

    
    @Injectable()
    export class ${this.modelName}Service {
      constructor(
        @InjectRepository(${this.modelName}) private ${entity}Repository: Repository<any>,
      ) {}
      async create(create${this.modelName}Dto: Create${this.modelName}Dto) {
    
        const result = await this.${entity}Repository.create({createPostDto});
        return await this.${entity}Repository.save(result);
      }
    
      async findAll(query): Promise<IPainationResponse<${this.modelName}>> {
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
        return this.${this.modelName}Repository.delete(id);
      }
    }`;
  }
  nestJsCrud() {
    const entity = this.modelName.toLowerCase() + '.entity';
    return `import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";

import { ${this.modelName} } from "./${entity}";

@Injectable()
export class ${this.modelName}Service extends TypeOrmCrudService<${this.modelName}> {
    constructor(@InjectRepository(${this.modelName}) repo) {
        super(repo);
    }
}`;
  }
  express() {
    console.log('createExpress');
  }
}
