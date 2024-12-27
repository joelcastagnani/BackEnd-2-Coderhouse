const { Command } = require("commander");

const program = new Command();

program.option("--mode <mode>", "modo de trabnajo", "produccion").parse();
module.exports = {
    program
}
