// abstract class ControllerAbstract {
//     public abstract framework: 'expressjs' | 'nestjs';
//     public pattern: 'repository' | 'ddd';
//     abstract forNext():void
// }
interface ControllerInterface {
    framework: 'expressjs' | 'nestjs';
    pattern: 'repository' | 'ddd';
    createNext():void
    createExpress():void;
}

export class ControllerTemplate implements ControllerInterface {
    public framework;
    public pattern;
     createNext() {
         console.log('createNext')
    }
    createExpress() {
         console.log('createExpress')
    }
    
   
}

class ControllerNextDecoratorAbstract  {
    public decoratedController:ControllerTemplate
    constructor(controller: ControllerTemplate){
        this.decoratedController = controller
    }

}

class ControllerTemplateNextDecorator extends ControllerNextDecoratorAbstract {

    constructor(controller) {
        super(controller)
        this.decoratedController = controller;
    }

    createNext() {
        this.decoratedController.createNext()
    }
}