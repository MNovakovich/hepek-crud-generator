import { TemplateInterface } from './template.interface';

export class ServiceTemplate implements TemplateInterface {
  modelName: string;
  constructor(modelName) {
    // super(modelName);
    this.modelName = modelName;
  }

  nextJsCore() {}
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
