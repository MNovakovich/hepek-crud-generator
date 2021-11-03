interface ControllerInterface {
  framework: 'expressjs' | 'nestjs';
  pattern: 'repository' | 'ddd';
  nestJsCrud(): any;
  nestCore(): any;
  express(): any;
}

abstract class ControllerBuilderCore {
  modelName: string;
  moduleFile: string;
  serviceFile: string;
  abstract nextJsCore();
  abstract nestJsCrud();
}

export class ControllerTemplate {
  public modelName: string;
  constructor(modelName) {
    this.modelName = modelName;
  }

  nextJsCore() {}
  nestJsCrud() {
    const moduleFile = this.modelName.toLowerCase() + '.entity.ts';
    const serviceFile = this.modelName.toLowerCase() + '.service.ts';
    return `
    import { Controller } from "@nestjs/common";
    import { Crud, CrudController } from "@nestjsx/crud";
    import { ApiTags } from "@nestjs/swagger";
    import { ${this.modelName} } from './${moduleFile}';
    import { ${this.modelName}Service } from './${serviceFile.slice(0, -3)}';

    @ApiTags('${this.modelName}')
    @Crud({
        model: {
            type: ${this.modelName},
        },
    })
    @Controller("${this.modelName}")
    export class ${this.modelName}Controller implements CrudController<${
      this.modelName
    }> {
    constructor(public service: ${this.modelName}Service) {}
    }
   `;
  }
  express() {
    console.log('createExpress');
  }
}
