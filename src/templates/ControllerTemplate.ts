import { TemplateInterface } from './template.interface';

export class ControllerTemplate implements TemplateInterface {
  public modelName: string;
  constructor(modelName) {
    this.modelName = modelName;
  }

  nextJsCore() {}
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
