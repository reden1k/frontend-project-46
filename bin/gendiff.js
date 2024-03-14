#!/usr/bin/env node
const { program } = require('commander');
var fs = require('fs');
function gendiff() {

    program
        .name('gendiff')
        .description('Compares two configuration files and shows a difference.')
        .version('0.0.1')
        .arguments('<filepath1> <filepath2>')
        .option('-f, --format [type]', 'output format')
        .helpOption('-h, --help,', 'output usage information')
        .action((first, second) => {
            fs.readFile(first, { encoding: 'utf8'}, (__error, stat) => {
                console.log(JSON.parse(stat).host)
            });
          });
    program.parse();


}

gendiff();