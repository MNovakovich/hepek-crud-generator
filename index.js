const fs = require('fs');
const path = require('path');
const modulesDir = path.join(__dirname, 'models/entities');
const moduleTemplate = require('./templates/module')
const serviceTemplate = require('./templates/service')
const controllerTemplate = require('./templates/controller')

fs.readdir(modulesDir, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    //listing all files using forEach
    files.forEach(function (file) {
        resourceBuilder(file)
    });
});



function resourceBuilder(file) {

    let moduleName = file.split('.')[0]
    const entityFile = moduleName.toLowerCase() + ".entity.ts"
    const moduleFile = moduleName.toLowerCase() + ".module.ts"
    const serviceFile = moduleName.toLowerCase() + ".service.ts"
    const controllerFile = moduleName.toLowerCase() + ".controller.ts"
    //create new directory
    const dirName= 'src/' + moduleName.toLowerCase()

    const moduleTmp = moduleTemplate(moduleName, entityFile)
    const serviceTmp = serviceTemplate(moduleName, entityFile)
    const controllerTmp = controllerTemplate(moduleName, entityFile, serviceFile);
    let originModulePath  = modulesDir +"/" + file
  
    if (!fs.existsSync(dirName)){
        fs.mkdirSync(dirName);
    }

    fs.copyFile(originModulePath, path.join(__dirname, dirName ) +'/'+ entityFile, (error) => {
        if (error) {
          console.error(error);
          return;
        }
      
        console.log("Copied Successfully!");
      })

      // Created Module
      fs.writeFile( path.join(__dirname, dirName ) +'/'+ moduleFile, moduleTmp, function (err) {
        if (err) return console.log(err);
      });

      // Created Service
      fs.writeFile( path.join(__dirname, dirName ) +'/'+ serviceFile, serviceTmp, function (err) {
        if (err) return console.log(err);
        console.log('created services');
      });
      // Create Controller
      fs.writeFile( path.join(__dirname, dirName ) +'/'+ controllerFile, controllerTmp, function (err) {
        if (err) return console.log(err);
        console.log('created controller');
      });
   
}

