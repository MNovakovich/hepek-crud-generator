export class ModuleTemplate {
  private modelName: string;
  constructor(modelName) {
    this.modelName = modelName;
  }
  nextJs() {
    let fileName = this.modelName.toLowerCase();
    return `import { Module } from '@nestjs/common';
import { ${this.modelName}Service } from './${fileName}.service';
import { ${this.modelName}Controller } from './${fileName}.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ${this.modelName} } from './${fileName}.entity';

@Module({
  imports: [SequelizeModule.forFeature([ ${this.modelName} ])],
  controllers: [${this.modelName}Controller],
  providers: [${this.modelName}Service],
})
export class ${this.modelName}Module {}`;
  }
  express() {
    console.log('createExpress');
  }
}
