import * as path from 'path';
import {
  IOpt,
  IApi,
} from './json';
import parseJSON from './json';
import { getAllFiles } from '../utils/getAllFiles';

export interface IOptions {
  inputDir: string;
  outputDir: string;
  request?: IOpt;
  response?: IOpt;
}

type Method = 'request' | 'response';

const transform = (method: Method, data: IApi) => {
  const json: {[i: string]: any} = {
    get: {},
    post: {},
    put: {},
    delete: {},
  };
  // eslint-disable-next-line no-restricted-syntax
  const paths = Object.keys(data);
  // eslint-disable-next-line
  for (const api of paths) {
    console.log(`scan api - ${method} ->  ${api}`);
    const result = api.split(' ');
    const target = data[api][method];
    json[result[0].toLowerCase()][result[1]] = target;
  }
  return json;
};

const scan = (options: IOptions) => {
  const {
    inputDir,
    outputDir,
    request: requestOpt,
    response: responseOpt,
  } = options;
  const jsFiles = getAllFiles(inputDir, 'js');
  const files: IApi = jsFiles.reduce((pre, cur) => {
    return { ...pre, ...require(cur) };
  }, jsFiles[0] ? require(jsFiles[0]) : {});
  const requestJSON = transform('request', files);
  const responseJSON = transform('response', files);
  /**
   * 生成请求参数
   */
  parseJSON(requestJSON, path.resolve(outputDir, './requests'), requestOpt);

  /**
   * 生成响应参数
   */
  parseJSON(responseJSON, path.resolve(outputDir, './responses'), responseOpt);

  console.log(`scan success! total: ${Object.keys(files).length} API`);

};

export default scan;
