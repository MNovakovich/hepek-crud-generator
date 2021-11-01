module.exports = function(moduleName, entitiFile) {
    return `
    import { Injectable } from "@nestjs/common";
    import { InjectRepository } from "@nestjs/typeorm";
    import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
    
    import { ${moduleName} } from "./${entitiFile.slice(0, -3)}";
    
    @Injectable()
    export class ${moduleName}Service extends TypeOrmCrudService<${moduleName}> {
      constructor(@InjectRepository(${moduleName}) repo) {
        super(repo);
      }
    }`
}