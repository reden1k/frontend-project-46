function gendiff() {
    const { program, Option } = require('commander');

    program
        .option('-V, --version', 'output the version number')
        .addHelpOption(new Option('-h, --help,', 'output usage information'));

    program.parse();

    console.log(program.parse())
}

gendiff();