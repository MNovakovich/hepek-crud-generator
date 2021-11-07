"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runNpmCommand = void 0;
var execSync = require('child_process').execSync;
function runNpmCommand(cmd) {
    console.log('packages are istalling ...');
    var error = false;
    try {
        var child = execSync(cmd);
        console.log('succesfully istalled packages');
        return false;
    }
    catch (error) {
        return true;
        console.log(error, ' - execSync error');
    }
}
exports.runNpmCommand = runNpmCommand;
//# sourceMappingURL=utils.js.map