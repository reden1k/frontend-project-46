#!/usr/bin/env node
import { program } from 'commander';
import { diff, toString, wrapper } from './getDiff.js';
import { getFile, getObject, getPath } from './parser.js';
import { fs } from 'file-system';

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
        getFile(getPath(first)),
      );
      const secondFile = getObject(
        getFile(getPath(second)),
      );

      // toString(diff(firstFile, secondFile));
      const data = wrapper(diff(firstFile, secondFile));
      fs.writeFileSync('__fixtures__/results/YAMLResult.yaml',JSON.stringify(data, ' ', 2));
    });
  program.parse();
}

gendiff();
