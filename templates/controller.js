module.exports = function(moduleName, entitiFile, serviceFile) {
return `
import { Controller } from "@nestjs/common";
import { Crud, CrudController } from "@nestjsx/crud";
import { ApiTags } from "@nestjs/swagger";
import { ${moduleName} } from './${entitiFile.slice(0, -3)}';
import { ${moduleName}Service } from './${serviceFile.slice(0, -3)}';

@ApiTags('${moduleName}')
@Crud({
  model: {
    type: ${moduleName},
  },
})
@Controller("${moduleName.toLowerCase()}")
  export class ${moduleName}Controller implements CrudController<${moduleName}> {
  constructor(public service: ${moduleName}Service) {}
}
    
    `
}