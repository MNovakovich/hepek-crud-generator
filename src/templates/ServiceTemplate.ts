import { TemplateInterface } from './template.interface';
import { formatUpperCaseToUnderline } from '../helpers';
export class ServiceTemplate implements TemplateInterface {
  modelName: string;
  constructor(modelName) {
    this.modelName = modelName;
  }

  nextJsCore() {
    const entity = formatUpperCaseToUnderline(this.modelName);
    const entityFile = entity + '.entity';
    return `import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PaginateDecorator, IPaginationResponse } from 'src/common/pagination';
import { Create${this.modelName}Dto } from './dto/create-${entity}.dto';
import { Update${this.modelName}Dto } from './dto/update-${entity}.dto';
import { ${this.modelName} } from './${entityFile}';
 
@Injectable()
export class ${this.modelName}Service {
  constructor(@InjectModel(${this.modelName}) private ${entity}Repository: typeof ${this.modelName}) {}

  async create(data: Create${this.modelName}Dto | any) {
    const result = await this.${entity}Repository.create(data);
    return result;
  }

  async findAll(query:any): Promise<${this.modelName}[]> {
    return await this.${entity}Repository.findAll({});
  }

  async findOne(id: number) {
    return await this.${entity}Repository.findOne({ where: { id } });
  }

  async update(id: number, data: Update${this.modelName}Dto): Promise<any> {
    const result = await this.${entity}Repository.findOne({ where: { id } });
    if (!result) {
      return new HttpException('${entity} not exist!', HttpStatus.BAD_REQUEST);
    }
    return await result.update(data);
  }

  remove(id: number) {
    return this.${entity}Repository.destroy({ where: { id }});
  }
}`;
  }
  express() {
    console.log('createExpress');
  }
}
/*

 const data = await new PaginateDecorator<${this.modelName}>({
      model: this.${entity}Repository,
      options: { limit: Number(query.limit) },
      //query: { order: [['email', 'ASC']] },
    });

    */
