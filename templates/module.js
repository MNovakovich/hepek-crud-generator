module.exports = function(moduleName, entitiFile) {
let fileName = moduleName.toLowerCase()
return `
import { Module } from '@nestjs/common';
import { ${moduleName}Service } from './${fileName}.service';
import { ${moduleName}Controller } from './${fileName}.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ${moduleName} } from './${entitiFile.slice(0, -3)}';

@Module({
imports: [TypeOrmModule.forFeature([ ${moduleName} ])],
controllers: [ ${moduleName}Controller],
providers: [${moduleName}Service],
})
export class ${moduleName}Module {}
    
    `
}