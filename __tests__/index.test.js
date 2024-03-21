import { expect, test, describe } from '@jest/globals';
import { diff } from '../bin/getDiff';
import { getObject, getPath, getFile } from '../bin/parser.js';

describe('get difference', () => {
  const file1 = getObject(
    getFile(
      getPath('__fixtures__/file1.json'),
    ),
  );

  const file2 = getObject(
    getFile(
      getPath('__fixtures__/file2.json'),
    ),
  );

  const compareFirstToSecond = getObject(
    getFile(getPath('__fixtures__/results/jsons.json')),
  ).file1Tofile2;

  const comapreSecondToFirst = getObject(
    getFile(getPath('__fixtures__/results/jsons.json')),
  ).file2Tofile1;

  test('should be 3 \'-\' and 2 \'+\' ', () => {
    expect(diff(file1, file2)).toEqual(compareFirstToSecond);
  });

  test('should be 2 \'-\' and 2 \'+\' ', () => {
    expect(diff(file2, file1)).toEqual(comapreSecondToFirst);
  });
});

