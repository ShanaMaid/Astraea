const fs = require('fs-extra');
const path = require('path');
const swagMock = require('swagmock');
const json2ts = require("json2ts");


const firstWordUpper = (s) => {
  const temp = s.split('');
  if (temp[0]) {
    temp[0] = temp[0].toUpperCase();
  }
  return temp.join('');
};

const path2Hump = (s) => {
  const temp = s.split('/');
  return temp.map((item) => {
    return firstWordUpper(item.replace(/:/g, ''));
  }).join('');
}


const start = async (swagger, dir) => {
  const interfaces = [];
  const mockgen = swagMock(swagger);
  const urls = Object.keys(swagger.paths);

  for (const url of urls) {
    const methods = Object.keys(swagger.paths[url]);
    for (const method of methods) {
      const pathName = `${method.toUpperCase()}${url}`.replace(/\{(.*?)\}/g, ':$1');

      const temp = {
        fileName: `${pathName}.ts`,
        method,
        path: url.replace(/\{(.*?)\}/g, ':$1'),
      };

      // mock数据
      await new Promise((r) => {
        mockgen.responses({
          path: url,
          operation: method.toLowerCase(),
          response: 200,
        })
        .then(mock => {
          const res = mock.responses;
          if (typeof res === 'object' && res !== null) {
            temp.content = json2ts.convert(JSON.stringify(res || {}));
          } else {
            temp.content = `export type RootObject = ${typeof res}`;
          }
          interfaces.push(temp);
          r();
        })
      })
    }
  }

  const methodInterfaces = {
    get: [],
    post: [],
    put: [],
    delete: []
  };

  interfaces.forEach((interface) => {
    // 创建每个route对应的interface文件
    fs.outputFileSync(path.resolve(dir, interface.fileName), interface.content);
    methodInterfaces[interface.method].push(interface.path);
  });


  // 生成汇总routes.ts文件
  const routesFileName = path.resolve(dir, './routes.ts');
  let output = '';
  let headImport = [];
  const methods = Object.keys(methodInterfaces);
  for (const method of methods) {
    const temp = [];
    output += `export interface I${firstWordUpper(method)}Routes {\r\n`;
    methodInterfaces[method].forEach((paths) => {
      const name = `${firstWordUpper(method)}${path2Hump(paths)}`;
      headImport.push(`import { RootObject as ${name} } from './${method.toUpperCase()}${paths}';`);
      temp.push(`  '${paths}': ${name};`);
    })

    output += temp.join('\r\n');

    output += `\r\n} \r\n\r\n`;
  }

  const fileContent = headImport.join('\r\n') + '\r\n\r\n' + output;
  
  fs.outputFileSync(routesFileName, fileContent);
}



module.exports = start;