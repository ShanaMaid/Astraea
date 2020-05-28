import * as fs from 'fs';
import * as path from 'path';

export const getAllFiles = (dir: string, suffix: string) => {
  const paths: string[] = [];
  const files = fs.readdirSync(dir);
  // eslint-disable-next-line no-restricted-syntax
  for (const file of files) {
    const filePath = path.resolve(dir, file);
    const stat = fs.lstatSync(filePath);
    if (stat.isDirectory()) {
      paths.push(...getAllFiles(filePath, suffix));
    } else if (file.match(new RegExp(`.${suffix}$`))) {
      paths.push(filePath);
    }
  }
  return paths;
};
