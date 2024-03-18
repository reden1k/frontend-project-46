import path from 'path';

export const resolvePath = (filepath) => path.resolve(process.cwd(), filepath);