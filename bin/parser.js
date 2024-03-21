import path from 'path';
import { fs } from 'file-system';

export const getPath = (filepath) => path.resolve(process.cwd(), filepath);

export const getFile = (file) => fs.readFileSync(file, { encoding: 'utf-8' });

export const getObject = (str) => JSON.parse(str);
