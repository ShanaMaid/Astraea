import fs = require('fs-extra');
import path = require('path');
import name from './name';

const { firstWordUpper, path2Hump } = name;

export interface IInterface {
  fileName: string; // 文件名 - 带有描述路径
  method: string; // route 方法名
  path: string; // route path地址
  content: string; // interface文件内容
}

export interface IMethodInterfaces {
  [index: string]: string[];
}

/**
 * 输出route描述文件
 * @param interfaces interface相关描述数组
 * @param dir 输出路径
 */
const outfile =  (interfaces: IInterface[], dir: string, opt?: {
  blackList?: string[],
  optional?: boolean;
}) => {
  const methodInterfaces: IMethodInterfaces = {
    get: [],
    post: [],
    put: [],
    delete: []
  };

  const { blackList = [],  optional = false } = opt || {};

  interfaces.forEach((i) => {
    methodInterfaces[i.method].push(i.path);
    // 创建每个route对应的interface文件
    const name = `${i.method.toUpperCase()}${i.path}`;
    if (blackList && blackList.indexOf(name) !== -1) {
      return;
    }
    let content = i.content;

    if (optional) {
      content = content.replace(/: !(any)/g, '?: ');
    }
    fs.outputFileSync(path.resolve(dir, i.fileName), content);
  });

  // 生成汇总routes.ts文件
  const routesFileName = path.resolve(dir, './routes.ts');
  let output = '';
  const headImport: string[] = [];
  const methods = Object.keys(methodInterfaces);
  for (const method of methods) {
    const temp: string[] = [];
    output += `export interface I${firstWordUpper(method)}Routes {\r\n`;
    methodInterfaces[method].forEach((paths) => {
      const name = `${firstWordUpper(method)}${path2Hump(paths)}`.replace(/-/g, '$');
      headImport.push(`import { RootObject as ${name} } from './${method.toUpperCase()}${paths}';`);
      temp.push(`  '${paths}': ${name};`);
    });

    output += temp.join('\r\n');
    output += `\r\n}\r\n\r\n`;
  }

  const fileContent = headImport.join('\r\n') + '\r\n\r\n' + output;

  fs.outputFileSync(routesFileName, fileContent);
};

export default outfile;
