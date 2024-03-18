#!/usr/bin/env node
import { program } from 'commander';
import { fs } from 'file-system';
import * as parser from '../bin/parser.js'
import diff from '../bin/getDiff.js'

function gendiff() {

    program
        .name('gendiff')
        .description('Compares two configuration files and shows a difference.')
        .version('0.0.1')
        .arguments('<filepath1> <filepath2>')
        .option('-f, --format [type]', 'output format')
        .helpOption('-h, --help,', 'output usage information')
        .action((first, second) => {
            const firstFile = JSON.parse(fs.readFileSync(parser.resolvePath(first), { encoding: 'utf8'}));
            const secondFile = JSON.parse(fs.readFileSync(parser.resolvePath(second), { encoding: 'utf8'}));
            console.log(diff(firstFile, secondFile))
          });
    program.parse();
}

gendiff();