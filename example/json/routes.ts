import { RootObject as GetApiPersionDetail } from './GET/api/persion/detail';
import { RootObject as GetApiPetDetail } from './GET/api/pet/detail';
import { RootObject as PostApiPersionCreate } from './POST/api/persion/create';

export interface IGetRoutes {
  '/api/persion/detail': GetApiPersionDetail;
  '/api/pet/detail': GetApiPetDetail;
}

export interface IPostRoutes {
  '/api/persion/create': PostApiPersionCreate;
}

export interface IPutRoutes {

}

export interface IDeleteRoutes {

}

