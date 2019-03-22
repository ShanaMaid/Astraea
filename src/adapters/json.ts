import { IInterface } from '../utils/out';
import outFile from '../utils/out';
import json2ts from '../utils/json2ts';

export interface IApi {
  // tslint:disable-next-line no-any
  [index: string]: any;
}

export interface IJson {
  get?: IApi;
  post?: IApi;
  put?: IApi;
  delete?: IApi;
}

const parse = (json: IJson) => {
  const interfaces: IInterface[] = [];
  Object.keys(json).forEach((method) => {
    const apis = json[method as keyof IJson] as IApi;
    for (const api in apis) {
      if (apis.hasOwnProperty(api)) {
        const el = apis[api];
        const pathName = `${method.toUpperCase()}${api}`;
        let content = typeof el  === 'function' ? el() : el;
        content = json2ts(content);
        const temp: IInterface = {
          fileName: `${pathName}.ts`,
          method,
          path: api,
          content,
        };
        interfaces.push(temp);
      }
    }
  });
  return interfaces;
};

export default (
  json: IJson,
  dir: string,
  opt?: {
    blackList?: string[],
    optional?: boolean;
  }
) => {
  const result = parse(json);
  outFile(result, dir, opt);
};
