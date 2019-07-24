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

export interface IOpt {
  blackList?: string[];
  optional?: boolean;
  suffix?: string;
}

const parse = (json: IJson, opt?: IOpt) => {
  const interfaces: IInterface[] = [];
  const { suffix = 'ts' } = (opt || {});
  Object.keys(json).forEach((method) => {
    const apis = json[method as keyof IJson] as IApi;
    for (const api in apis) {
      if (apis.hasOwnProperty(api)) {
        const el = apis[api];
        const pathName = `${method.toUpperCase()}${api}`;
        let content = typeof el  === 'function' ? el() : el;
        content = json2ts(content);
        const temp: IInterface = {
          fileName: `${pathName}.${suffix}`,
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
  opt?: IOpt,
) => {
  const result = parse(json, opt);
  outFile(result, dir, opt);
};
