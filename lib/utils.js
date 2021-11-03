"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runNpmCommand = void 0;
var execSync = require('child_process').execSync;
function runNpmCommand(cmd) {
    console.log('packages are istalling ...');
    try {
        var child = execSync(cmd);
        console.log('succesfully istalled packages');
        return true;
    }
    catch (error) {
        return false;
        console.log(error, ' - error');
    }
}
exports.runNpmCommand = runNpmCommand;
;
//# sourceMappingURL=utils.js.map