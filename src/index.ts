import * as fs from 'fs-extra';
import * as path from 'path';
import { getAllFiles } from './common';

export type Params = {
  sourceDir: string;
  typingDir: string;
};

export interface IInterface {
  fileName: string; // 文件名 - 带有描述路径
  method: string; // route 方法名
  url: string; // route path地址
  content: string; // interface文件内容
}

export interface IMethodInterfaces {
  [index: string]: string[];
}

const firstWordUpper = (s: string) => {
  const temp = s.split('');
  if (temp[0]) {
    temp[0] = temp[0].toUpperCase();
  }
  return temp.join('');
};

const path2Hump = (s: string) => {
  const temp = s.split('/');
  return temp.map((item) => {
    return firstWordUpper(item.replace(/:/g, ''));
  }).join('');
};

const replaceSensitiveChar = (str: string) => {
  const r = str.replace(/-/g, '$')
  .replace(/\+/g, '#')
  .replace(/:/g, '@');
  return r;
}


export class Astraea {
  private params: Params;

  constructor(p: Params) {
    this.params = p;
  }

  // 格式化文件
  formatFile = (filePath: string): IInterface | undefined => {
    const content = fs.readFileSync(filePath, {
      encoding: 'utf8'
    });

    const match = content.match(/@@(.+)@@/);
    if (!match) {
      return undefined;
    }
    const [method, url] = match[1].trim().split(' ');
    return {
      method: method.toLowerCase(),
      url,
      fileName: replaceSensitiveChar(`./${method.toUpperCase()}${url}.ts`),
      content,
    };
  };

  scanTypeFiles = (dir: string) => {
    const files = getAllFiles(dir, 'd.ts');
    return files;
  };

  /**
 * 输出route描述文件
 * @param interfaces interface相关描述数组
 * @param dir 输出路径
 */
  outfile = (interfaces: IInterface[]) => {
    const dir = this.params.typingDir;
    const methodInterfaces: IMethodInterfaces = {
      get: [],
      post: [],
      put: [],
      delete: []
    };

    interfaces.forEach((i) => {
      methodInterfaces[i.method].push(i.url);
      fs.outputFileSync(path.resolve(dir, i.fileName), i.content);
    });

    // 生成汇总routes.ts文件
    const requestFileName = path.resolve(dir, './request.ts');
    const responseFileName = path.resolve(dir, './response.ts');
    let requestOutput = '';
    let responseOutput = '';
    const requestHeadImport: string[] = [];
    const responseHeadImport: string[] = [];
    const methods = Object.keys(methodInterfaces);
    for (const method of methods) {
      const requestTemp: string[] = [];
      const responsetemp: string[] = [];
      requestOutput += `export interface I${firstWordUpper(method)}Routes {\r\n`;
      responseOutput += `export interface I${firstWordUpper(method)}Routes {\r\n`;
      methodInterfaces[method].forEach((url) => {
        const name = replaceSensitiveChar(`${firstWordUpper(method)}${path2Hump(url)}`);
        const requestName = `${name}Request`;
        const responseName = `${name}Response`;
        const filePath = replaceSensitiveChar(url);
        requestHeadImport.push(`import { RequestObject as ${requestName} } from './${method.toUpperCase()}${filePath}';`);
        responseHeadImport.push(`import { ResponseObject as ${responseName} } from './${method.toUpperCase()}${filePath}';`);
        requestTemp.push(`  '${url}': ${requestName};`);
        responsetemp.push(`  '${url}': ${responseName};`);
      });

      requestOutput += requestTemp.join('\r\n');
      requestOutput += `\r\n}\r\n\r\n`;

      responseOutput += responsetemp.join('\r\n');
      responseOutput += `\r\n}\r\n\r\n`;
    }

    const requestfileContent = requestHeadImport.join('\r\n') + '\r\n\r\n' + requestOutput;
    const responsefileContent = responseHeadImport.join('\r\n') + '\r\n\r\n' + responseOutput;

    fs.outputFileSync(requestFileName, requestfileContent);
    fs.outputFileSync(responseFileName, responsefileContent);
  };

  start = () => {
    const files = this.scanTypeFiles(this.params.sourceDir);
    const result: IInterface[] = [];
    files.map(this.formatFile).forEach((_) => {
      if (_) {
        result.push(_);
      }
    });
    this.outfile(result);
    fs.writeFileSync(
      path.resolve(this.params.typingDir, './netTypings.d.ts'),
      `import * as IReqRoutes from './request';
import * as IResRoutes from './response';

declare module 'astraea' {
  interface IReqGetRoutes extends IReqRoutes.IGetRoutes { }
  interface IResGetRoutes extends IResRoutes.IGetRoutes { }
  interface IReqPostRoutes extends IReqRoutes.IPostRoutes { }
  interface IResPostRoutes extends IResRoutes.IPostRoutes { }
  interface IReqPutRoutes extends IReqRoutes.IPutRoutes { }
  interface IResPutRoutes extends IResRoutes.IPutRoutes { }
  interface IReqDeleteRoutes extends IReqRoutes.IDeleteRoutes { }
  interface IResDeleteRoutes extends IResRoutes.IDeleteRoutes { }
}`)
  };
}