import { RootObject as GetApiV1AccountsToken } from './GET/api/v1/accounts/token';
import { RootObject as GetApiV1AccountsId } from './GET/api/v1/accounts/:id';

export interface IGetRoutes {
  '/api/v1/accounts/token': GetApiV1AccountsToken;
  '/api/v1/accounts/:id': GetApiV1AccountsId;
}

export interface IPostRoutes {

}

export interface IPutRoutes {

}

export interface IDeleteRoutes {

}

