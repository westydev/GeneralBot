const chalk = require("chalk")


   function info(str) {
      console.log(`${chalk.default.blue(`[INFO]`)} ${chalk.default.blue(str)}`);
    }
   function warn(str) {
     console.log(`${chalk.default.yellow(`[WARN]`)} ${chalk.default.yellow(str)}`);
   }
   function error(str) {
     console.log(`${chalk.default.red(`[ERROR]`)} ${chalk.default.red(str)}`);
   }
   function success(str) {
     console.log(`${chalk.default.green(`[SUCCES]`)} ${chalk.default.green(str)}`);
   }


module.exports = { info, warn, error, success }