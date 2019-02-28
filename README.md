<h1 align='center'>Astraea</h1>
<p align='center'>
  <a href="https://travis-ci.com/ShanaMaid/Astraea/">
    <img src="https://travis-ci.com/ShanaMaid/Astraea.svg" alt="travis ci badge">
  </a>
  <img src='https://img.shields.io/npm/v/astraea.svg?style=flat-square' alt="version">
  <img src='https://img.shields.io/npm/l/astraea.svg' alt="license">
  <img src='http://img.badgesize.io/https://unpkg.com/astraea/index.js?compression=gzip&label=gzip%20size:%20&style=flat-square'>
  <img src='https://img.shields.io/npm/dt/astraea.svg?style=flat-square' alt="downloads">
  <img src='https://img.shields.io/npm/dm/astraea.svg?style=flat-square' alt="downloads-month">
</p>

## Description
help developer output the typescript interfaces of api by `swagger.json` or `json`

## Install
```
npm install astraea
```

## Usage
### swagger
[Demo](./example/swagger)

[Test](./test/swagger.js)
#### options
  - `input`, swagger.json
  - `dir`, output directory
  - `blackList`, filter `path`
```js
const astraea = require('astraea');
const swagger = require('./swagger.json');
astraea.swagger(
  swagger, 
  './example/swagger', 
  ['DELETE/pet/:petId']
)
```

### json
[Demo](./example/json)

[Test](./test/json.js)
#### options
  - `input`, json description
  - `dir`, output directory
  - `blackList`, filter `path`
```js
const astraea = require('astraea');

astraea.json(
  {
    get: {
      '/api/persion/detail': {
        a: 1,
      },
      '/api/pet/detail': {
        a: 1,
      }
    },
    post: {
      '/api/persion/create': () => [{
        a: 1,
        b: [
          {
            v: 1
          }
        ]
      }],
    }
  }, 
  './example/json', 
  [
    'GET/api/persion/detail'
  ]
)
```
## How to use?
this is a simple example, you need to rework if use in prod!
```js
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
```
## Examlpe
[here](./example)

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