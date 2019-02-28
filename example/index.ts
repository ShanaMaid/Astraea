// 这个文件用于rd手写补充一些自定义的接口
import {
  IGetRoutes as ISwaggerGetRoutes,
  IPostRoutes as ISwaggerPostRoutes,
  IPutRoutes as ISwaggerPutRoutes,
  IDeleteRoutes as ISwaggerDeleteRoutes,
} from './swagger/routes';

import {
  IGetRoutes as IJsonGetRoutes,
  IPostRoutes as IJsonPostRoutes,
  IPutRoutes as IJsonPutRoutes,
  IDeleteRoutes as IJsonDeleteRoutes,
} from './json/routes';

export interface IGetRoutes extends ISwaggerGetRoutes, IJsonGetRoutes {}

export interface IPostRoutes extends ISwaggerPostRoutes,  IJsonPostRoutes {}

export interface IPutRoutes extends ISwaggerPutRoutes, IJsonPutRoutes {}

export interface IDeleteRoutes extends ISwaggerDeleteRoutes, IJsonDeleteRoutes {}

const get: <K extends keyof IGetRoutes>(url: K) => IGetRoutes[K];
const post: <K extends keyof IPostRoutes>(url: K) => IPostRoutes[K];
const dl: <K extends keyof IPutRoutes>(url: K) => IPutRoutes[K];
const put: <K extends keyof IDeleteRoutes>(url: K) => IDeleteRoutes[K];

get('/pet/:petId').category.id;
post('/api/persion/create');
dl('/pet');
put('/store/order/:orderId');

