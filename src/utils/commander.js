const { Command } = require("commander");

const program = new Command(); // Define `program` primero

program
  .option("--mode <mode>", "modo de trabajo", "produccion") // Opción con valor predeterminado
  .option(
    "--persistence <persistence>",
    "Modo de persistencia del aplicativo",
    "mongo" // Valor predeterminado
  )
  .option("-d", "Variable para debug", false) // Opción booleana
  .requiredOption(
    "-u <user>",
    "USUARIO TRABAJANDO", // Texto en mayúsculas corregido
    "no se ha declarado el user"
  )
  .option("-l, --letters [letters...]", "Specify letter") // Lista de valores opcionales
  .parse(process.argv); // Parsear los argumentos aquí

const { mode, persistence } = program.opts(); // Accede a las opciones después del parseo

console.log("Options: ", program.opts());
console.log("Remaning arguments: ", program.args);

module.exports = {
  program,
};

// //node commander.js -d -p 3030 --mode development -u root --letter a b c
// //node commander.js -p 3030 -u root 2 a 4 --letter a b c
