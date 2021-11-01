"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerTemplate = void 0;
var ControllerTemplate = /** @class */ (function () {
    function ControllerTemplate() {
    }
    ControllerTemplate.prototype.createNext = function () {
        console.log('createNext');
    };
    ControllerTemplate.prototype.createExpress = function () {
        console.log('createExpress');
    };
    return ControllerTemplate;
}());
exports.ControllerTemplate = ControllerTemplate;
var ControllerNextDecoratorAbstract = /** @class */ (function () {
    function ControllerNextDecoratorAbstract(controller) {
        this.decoratedController = controller;
    }
    return ControllerNextDecoratorAbstract;
}());
var ControllerTemplateNextDecorator = /** @class */ (function (_super) {
    __extends(ControllerTemplateNextDecorator, _super);
    function ControllerTemplateNextDecorator(controller) {
        var _this = _super.call(this, controller) || this;
        _this.decoratedController = controller;
        return _this;
    }
    ControllerTemplateNextDecorator.prototype.createNext = function () {
        this.decoratedController.createNext();
    };
    return ControllerTemplateNextDecorator;
}(ControllerNextDecoratorAbstract));
//# sourceMappingURL=ControllerTemplate.js.map