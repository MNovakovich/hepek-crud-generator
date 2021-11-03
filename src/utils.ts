const { execSync } = require('child_process');
export  function runNpmCommand(cmd){
    console.log('packages are istalling ...')
    try {
        var child =  execSync(cmd);
        console.log('succesfully istalled packages')
        return true;
    } catch (error) {
        return false;
         console.log(error, ' - error')
    }
  

   
        
 
};
  