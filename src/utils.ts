const { execSync } = require('child_process');
export function runNpmCommand(cmd) {
  console.log('packages are istalling ...');
  let error = false;
  try {
    var child = execSync(cmd);
    console.log('succesfully istalled packages');
    return false;
  } catch (error) {
    return true;
    console.log(error, ' - execSync error');
  }
}
