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
    import { InjectModel } from '@nestjs/sequelize';
    import { PaginateDecorator, IPaginationResponse } from 'src/common/pagination';
    // import { CreatePostDto } from './dto/create-post.dto';
    // import { UpdatePostDto } from './dto/update-post.dto';
    import { ${this.modelName} } from './${entityFile}';

    
    @Injectable()
    export class ${this.modelName}Service {
      constructor(
        @InjectModel(${this.modelName}) private ${entity}Repository: typeof ${this.modelName},
      ) {}
      async create(create${this.modelName}Dto: Create${this.modelName}Dto) {
    
        const result = await this.${entity}Repository.create({createPostDto});
        return await this.${entity}Repository.save(result);
      }
    
      async findAll(query): Promise<IPaginationResponse<${this.modelName}>> {
     
        const data =  await new PaginateDecorator<${this.modelName}>({
          model:this.${entity}Repository,   options: { limit: Number(query.limit) },
          query: { order: [['email', 'ASC']] },
        });
        return data.getResult(query.page);
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
  express() {
    console.log('createExpress');
  }
}
