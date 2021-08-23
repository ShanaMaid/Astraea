import { ResponseObject as GetApiV1GoodsDetailResponse } from './GET/api/v1/goods/detail';
import { ResponseObject as PostApiV1GoodsDetail2IdResponse } from './POST/api/v1/goods/detail/2/@id';
import { ResponseObject as PostApiV1GoodsDetailIdResponse } from './POST/api/v1/goods/detail/@id';

export interface IGetRoutes {
  '/api/v1/goods/detail': GetApiV1GoodsDetailResponse;
}

export interface IPostRoutes {
  '/api/v1/goods/detail/2/:id': PostApiV1GoodsDetail2IdResponse;
  '/api/v1/goods/detail/:id': PostApiV1GoodsDetailIdResponse;
}

export interface IPutRoutes {

}

export interface IDeleteRoutes {

}

