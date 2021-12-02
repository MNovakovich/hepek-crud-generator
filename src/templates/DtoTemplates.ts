import { TemplateInterface } from './template.interface';

export class DtoTemplates {
  public modelName: string;
  constructor(modelName: any) {
    this.modelName = modelName;
  }

  createDto() {
    // const entity = this.modelName.toLocaleLowerCase();
    // const serviceFile = './' + entity + '.service';
    return `export class Create${this.modelName}Dto {}`;
  }
  updateDto() {
    return `export class Update${this.modelName}Dto {}`;
  }
}
