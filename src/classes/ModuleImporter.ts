var fs = require('fs');
export class ModuleExporter {
  static add(newModules) {
    const appModule = 'src/app.module.ts';
    fs.readFile(appModule, 'utf8', function (err, data) {
      if (err) {
        return console.log(err);
      }

      const match = data.match(
        /imports:(\ *)\[((\ *)([a-zA-Z\.\()\t\n\,\ ]*(\])))/g
      );

      let models = match[0].trim().split(':');
      models = models[1].trim();
      models = models.substring(1, models.length - 1);

      models = models.split(',');
      models[0] = `\t${models[0]}`;

      newModules.forEach((item) => {
        console.log(item);
        models.push(`\n\t${item.modelName}Module` + '');
      });

      models = `imports:[
          ${models.toString('utf8')}
        ]`;
      const result = data.replace(match, models);

      fs.writeFile(appModule, result, 'utf8', function (err, data) {
        if (err) return console.log(err);
        console.log(data);
      });
    });
  }
}
