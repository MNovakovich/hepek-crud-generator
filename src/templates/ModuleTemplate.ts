export class ModuleTemplate {
  private modelName: string;
  public modelFile: string;
  constructor(model, pattern) {
    this.modelName = model.modelName;
    this.modelFile = model.modelFile;
  }
  nextJs() {
    let fileName = this.modelFile;
    return `import { Module } from '@nestjs/common';
import { ${this.modelName}Service } from './${fileName}.service';
import { ${this.modelName}Controller } from './${fileName}.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ${this.modelName} } from './${fileName}.entity';

@Module({
  imports: [TypeOrmModule.forFeature([${this.modelName}])],
  controllers: [${this.modelName}Controller],
  providers: [${this.modelName}Service],
})
export class ${this.modelName}Module {}
`;
  }
  express() {
    console.log('createExpress');
  }
}
