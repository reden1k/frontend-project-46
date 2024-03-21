#!/usr/bin/env node
import { program } from 'commander';
import { diff, toString } from './getDiff.js';
import { getFile, getObject, getPath } from './parser.js';

function gendiff() {
  program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .version('0.0.1')
    .arguments('<filepath1> <filepath2>')
    .option('-f, --format [type]', 'output format')
    .helpOption('-h, --help,', 'output usage information')
    .action((first, second) => {
      const firstFile = getObject(
        getFile(getPath(first), { encoding: 'utf8' }),
      );
      const secondFile = getObject(
        getFile(getPath(second), { encoding: 'utf8' }),
      );

      toString(diff(firstFile, secondFile));
    });
  program.parse();
}

gendiff();
