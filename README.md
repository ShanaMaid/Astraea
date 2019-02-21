<h1 align='center'>sw2ts</h1>
<p align='center'>
  <a href="https://travis-ci.com/ShanaMaid/sw2ts/">
    <img src="https://travis-ci.com/ShanaMaid/sw2ts.svg" alt="travis ci badge">
  </a>
  <img src='https://img.shields.io/npm/v/sw2ts.svg?style=flat-square' alt="version">
  <img src='https://img.shields.io/npm/l/sw2ts.svg' alt="license">
  <img src='http://img.badgesize.io/https://unpkg.com/sw2ts/lib/Archer.js?compression=gzip&label=gzip%20size:%20&style=flat-square'>
  <img src='https://img.shields.io/npm/dt/sw2ts.svg?style=flat-square' alt="downloads">
  <img src='https://img.shields.io/npm/dm/sw2ts.svg?style=flat-square' alt="downloads-month">
  <a href='https://blog.shanamaid.top/sw2ts/'><img src='https://img.shields.io/badge/website%20-archer-51b26d.svg'/></a>
</p>

## Description
transform `swagger.json` to interfaces of typescript.

##Usage
### cli

- init --- `options`
  - -i，--input，swagger.json path
  - -o，--output，output dir, default: `./`

```
sw2ts init -i ./example/swagger.json -o ./
```

### node
```
const sw2ts = require('sw2ts');
const swagger = require('./swagger.json');
sw2ts(swagger, __dirname);
```

## Examlpe
[here](./example)
### swagger.json
[click here](./example/swagger.json)

### routes.ts
[click here](./example/routes.ts)
```js
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
import { RootObject as DeletePetPetId } from './DELETE/pet/:petId';
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
  '/pet/:petId': DeletePetPetId;
  '/store/order/:orderId': DeleteStoreOrderOrderId;
  '/user/:username': DeleteUserUsername;
} 
```