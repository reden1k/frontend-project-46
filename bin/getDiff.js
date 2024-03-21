import _ from 'lodash';

export const diff = (file1, file2) => {
  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);

  const lines = _.sortBy(_.union(keys1, keys2)).map((key) => {
    let line;
    if (_.isObject(file1[key]) && _.isObject(file2[key])) {
     line = (iter(file1[key], 1))
    }
    if (_.includes(keys1, key) && _.includes(keys2, key)) {
      if (_.isEqual(file1[key], file2[key])) {
        line = `  ${key}: ${file1[key]}`;
      } else {
        line = `- ${key}: ${file1[key]}, \n  + ${key}: ${file2[key]}`;
      }
    }

    if (_.includes(keys1, key) && !_.includes(keys2, key)) {
      line = `- ${key}: ${file1[key]}`;
    }
    if (!_.includes(keys1, key) && _.includes(keys2, key)) {
      line = `+ ${key}: ${file2[key]}`;
    }
    return line;
  });
  return lines;
};

const iter = (currentValue, depth) => {
  if (typeof currentValue !== 'object' || currentValue === null) {
    return `${currentValue}`;
  }
  const indentSize = depth * 1;
  const currentIndent = ' '.repeat(indentSize);
  const bracketIndent = ' '.repeat(indentSize - 1);
  const lines = Object
    .entries(currentValue)
    .map(([key, val]) => `${currentIndent}${key}: ${iter(val, depth + 1)}`);
  return [
    '{',
    ...lines,
    `${bracketIndent}}`,
  ].join('\n');
};

export const toString = (lines) => console.log(`${['{', ...lines].join('\n  ')}\n}`);
