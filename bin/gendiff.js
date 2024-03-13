#!/usr/bin/env node
import { program, Option } from 'commander';
function gendiff() {

    program
        .usage('[options] <filepath1> <filepath2>')
        .description('Compares two configuration files and shows a difference.')
        .option('-V, --version', 'output the version number')
        .option('-f, --format [type]', 'output format')
        .addHelpOption(new Option('-h, --help,', 'output usage information'));

    program.parse();

    console.log(program.parse())
}

gendiff();