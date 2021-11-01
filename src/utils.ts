const { execSync , exec} = require('child_process');
export async function runNpmCommand(cmd){
    console.log('packages are istalling ...')
    var child = await exec(cmd);

    setTimeout(() => {
        console.log('succesfully istalled packages')
    },5000)
};
  