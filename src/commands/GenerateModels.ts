import { FrameworkEnum } from '../constants';
import { frameworkType } from '../interfaces';

class GenerateModels {
  public program: any;
  public inquirer: any;

  constructor(program, inquirer) {
    //  console.log(inquirer)
    this.program = program;
    this.inquirer = inquirer;
  }

  public create(cb) {
    this.program
      .command('generate:models')
      .description(
        'generate models based on database. For the time beign it just suport mysql engene.'
      )
      .alias('gm')
      .action(async (options) => {
        let data: any = {};
        const cliQuestions = await this.cliQuestions();
        data = { ...cliQuestions };
        data.framework = cliQuestions.framework.toLowerCase();
        data.pattern = cliQuestions.pattern.toLowerCase();

        if (data.framework === FrameworkEnum.nestjs) {
          const { nest_crud } = await this.askAboutNextCrudLibrary();
          data.nest_crud = nest_crud;
        }

        cb(data);
      });
  }

  async cliQuestions() {
    const data = await this.inquirer.prompt([
      {
        type: 'input',
        name: 'host',
        message: 'DB Host:',
        default: 'localhost',
        //default: "false"
      },
      {
        type: 'input',
        name: 'db_name',
        message: 'DB Name:',
        //default: "false"
      },
      {
        type: 'input',
        name: 'db_port',
        message: 'Db Port:',
        default: 3306,
      },
      {
        type: 'input',
        name: 'user',
        message: 'DB User:',
        default: 'root',
      },
      {
        type: 'password',
        name: 'password',
        message: 'DB Password:',
        mask: '*',
        default: '',
      },
      {
        type: 'list',
        name: 'engine',
        message: 'DB Engine:',
        choices: ['mysql', 'postgres', 'mssql', 'sqlite'],

        default: 'mysql',
      },
      {
        type: 'list',
        name: 'framework',
        message: 'Which framewor do you want to use:',
        choices: ['NestJS', 'ExpressJS'],
        //default: "false"
      },
      {
        type: 'list',
        name: 'pattern',
        message: 'Which Structural Pattern you want to use:',
        choices: ['DDD', 'Repository'],
        //default: "false"
      },
    ]);

    return data;
  }

  public async askAboutNextCrudLibrary() {
    const data = await this.inquirer.prompt([
      {
        type: 'confirm',
        name: 'nest_crud',
        message: 'Do you want to use @nestjs/crud library?',
        default: 'false',
      },
    ]);

    return data;
  }
}

export default GenerateModels;
