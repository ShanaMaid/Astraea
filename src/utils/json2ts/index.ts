// tslint:disable no-any
const json2ts = require('./src/json2ts');

const handle = new json2ts.Json2Ts();

const getType = (a: any) => Object.prototype.toString.call(a);

export default (source: any) => {
  const type = getType(source);
  if (type === '[object Array]') {
    const temp = source[0];
    const type = getType(temp);
    if (temp === undefined || temp === null || type === '[object Array]') {
      return `export type RootObject = any[];`;
    } else if (type === '[object Object]') {
      let str = handle.convert(JSON.stringify(temp || {}));
      str = str.replace(/(export interface) RootObject/, '$1 OldRootObject');
      str += `\r\nexport type RootObject = OldRootObject[];`;
      return str;
    } else {
      return `export type RootObject = ${typeof source[0]}[];`;
    }
  } else if (type === '[object Object]') {
    return handle.convert(JSON.stringify(source || {}));
  } else if (type === '[object Null]' || type === '[object Undefined]') {
    return `export type RootObject = any;`;
  } else {
    return `export type RootObject = ${typeof source};`;
  }
};
