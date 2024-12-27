const { Command } = require("commander");

const program = new Command();

program
    .option("-d", "Variable para debug", false)
    .option('-p <port>', 'Puerto del servidor', 8080)
    .option('--mode <mode>', 'modo de trabnajo', 'produccion')
    .requiredOption('-u <user>', 'uSUARIO TRABAJANDO', 'no se ha declarado el user')
    .option('-l, --letters [letters...]', 'Specifdy letter')
    .parse()

console.log('Options: ', program.opts());
console.log('Remaning arguments: ', program.args);

//node commander.js -d -p 3030 --mode development -u root --letter a b c
//node commander.js -p 3030 -u root 2 a 4 --letter a b c