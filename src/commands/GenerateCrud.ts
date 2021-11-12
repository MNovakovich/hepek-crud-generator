import { FrameworkEnum } from '../constants';
import { frameworkType } from '../interfaces';

class GenerateCrud {
  public program: any;
  public inquirer: any;

  constructor(program, inquirer) {
    //  console.log(inquirer)
    this.program = program;
    this.inquirer = inquirer;
  }

  public create(cb) {
    this.program
      .command('generate:crud:all')
      .description(
        'generate models based on database. For the time beign it just suport mysql engene.'
      )
      .alias('gcall')
      .action(async (options) => {
        let data: any = {};
        const cliQuestions = await this.cliQuestions();
        data = { ...cliQuestions };
        data.pattern = cliQuestions.pattern.toLowerCase();
        cb(data);
      });
  }

  async cliQuestions() {
    const data = await this.inquirer.prompt([
      {
        type: 'list',
        name: 'pattern',
        message: 'Which Structural Pattern you want to use:',
        choices: ['DDD', 'Repository'],
        //default: "false"
      },
      {
        type: 'confirm',
        name: 'nest_crud',
        message: 'Do you want to use @nestjs/crud library?',
        default: false,
      },
    ]);

    return data;
  }
}

export default GenerateCrud;
