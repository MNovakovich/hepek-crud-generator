interface ControllerInterface {
    framework: 'expressjs' | 'nestjs';
    pattern: 'repository' | 'ddd';
    createNext(): void;
    createExpress(): void;
}
export declare class ControllerTemplate implements ControllerInterface {
    framework: any;
    pattern: any;
    createNext(): void;
    createExpress(): void;
}
export {};
//# sourceMappingURL=ControllerTemplate.d.ts.map