import { RootObject as GetPetFindByStatus } from './GET/pet/findByStatus';
import { RootObject as GetPetFindByTags } from './GET/pet/findByTags';
import { RootObject as GetPetPetId } from './GET/pet/:petId';
import { RootObject as GetStoreInventory } from './GET/store/inventory';
import { RootObject as GetStoreOrderOrderId } from './GET/store/order/:orderId';
import { RootObject as GetUserLogin } from './GET/user/login';
import { RootObject as GetUserLogout } from './GET/user/logout';
import { RootObject as GetUserUsername } from './GET/user/:username';
import { RootObject as PostPet } from './POST/pet';
import { RootObject as PostPetPetId } from './POST/pet/:petId';
import { RootObject as PostPetPetIdUploadImage } from './POST/pet/:petId/uploadImage';
import { RootObject as PostStoreOrder } from './POST/store/order';
import { RootObject as PostUser } from './POST/user';
import { RootObject as PostUserCreateWithArray } from './POST/user/createWithArray';
import { RootObject as PostUserCreateWithList } from './POST/user/createWithList';
import { RootObject as PutPet } from './PUT/pet';
import { RootObject as PutUserUsername } from './PUT/user/:username';
import { RootObject as DeleteStoreOrderOrderId } from './DELETE/store/order/:orderId';
import { RootObject as DeleteUserUsername } from './DELETE/user/:username';

export interface IGetRoutes {
  '/pet/findByStatus': GetPetFindByStatus;
  '/pet/findByTags': GetPetFindByTags;
  '/pet/:petId': GetPetPetId;
  '/store/inventory': GetStoreInventory;
  '/store/order/:orderId': GetStoreOrderOrderId;
  '/user/login': GetUserLogin;
  '/user/logout': GetUserLogout;
  '/user/:username': GetUserUsername;
} 

export interface IPostRoutes {
  '/pet': PostPet;
  '/pet/:petId': PostPetPetId;
  '/pet/:petId/uploadImage': PostPetPetIdUploadImage;
  '/store/order': PostStoreOrder;
  '/user': PostUser;
  '/user/createWithArray': PostUserCreateWithArray;
  '/user/createWithList': PostUserCreateWithList;
} 

export interface IPutRoutes {
  '/pet': PutPet;
  '/user/:username': PutUserUsername;
} 

export interface IDeleteRoutes {
  '/store/order/:orderId': DeleteStoreOrderOrderId;
  '/user/:username': DeleteUserUsername;
} 

