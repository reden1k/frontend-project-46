import _ from 'lodash';
import { fs } from 'file-system'
export const diff = (file1, file2) => {
  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);

  const lines = _.sortBy(_.union(keys1, keys2)).map((key) => {
    if (_.isObject(file1[key]) && _.isObject(file2[key])) {
      return {
        type: 'nested',
        key,
        children: diff(file1[key], file2[key])
      };
    }
    if (_.has(file1, key) && _.has(file2, key)){
      if(_.isEqual(file1[key], file2[key]) && !_.isObject(file1[key]) && !_.isObject(file2[key])) {
        return {
          type: 'unchanged',
          key,
          value: file1[key]
        }
      }

      if (!_.isEqual(file1[key], file2[key]) && !_.isObject(file1[key]) && !_.isObject(file2[key])) {
        return {
          type: 'changed',
          key,
          oldValue: file1[key],
          newValue: file2[key]
        }
      }
    }
  });
  return lines;
};

export const wrapper = (lines) => ({type: 'root', child: lines})

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

/**
 * changed
 * unchanged
 * nested
 * removed
 * added
 */

/**
 * [{
 * key: common,
 * 
 * 
 * }]
 */