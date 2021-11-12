import { TemplateInterface } from './template.interface';
export declare class ControllerTemplate implements TemplateInterface {
    modelName: string;
    modelFile: string;
    pattern: string;
    serviceFile: string;
    constructor(model: any, pattern: any);
    nextJsCore(): string;
    nestJsCrud(): string;
    express(): void;
}
//# sourceMappingURL=ControllerTemplate.d.ts.map