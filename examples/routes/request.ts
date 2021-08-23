import { RequestObject as GetApiV1GoodsDetailRequest } from './GET/api/v1/goods/detail';
import { RequestObject as PostApiV1GoodsDetail2IdRequest } from './POST/api/v1/goods/detail/2/@id';
import { RequestObject as PostApiV1GoodsDetailIdRequest } from './POST/api/v1/goods/detail/@id';

export interface IGetRoutes {
  '/api/v1/goods/detail': GetApiV1GoodsDetailRequest;
}

export interface IPostRoutes {
  '/api/v1/goods/detail/2/:id': PostApiV1GoodsDetail2IdRequest;
  '/api/v1/goods/detail/:id': PostApiV1GoodsDetailIdRequest;
}

export interface IPutRoutes {

}

export interface IDeleteRoutes {

}

