/**
 * 网络库接入高阶函数
 * 减少对代码的侵入
 */

export interface IReqGetRoutes { }
export interface IResGetRoutes { }
export interface IReqPostRoutes { }
export interface IResPostRoutes { }
export interface IReqPutRoutes { }
export interface IResPutRoutes { }
export interface IReqDeleteRoutes { }
export interface IResDeleteRoutes { }

export type ResultFul = {
  [i: string]: string
}

export type Options = {
  restful: ResultFul;
}

/**
 * restfulPath: /asas/:name/:id
 * restful: { name: 'goods', id: '121212'}
 * path: /asas/goods/121212
 * @param restfulPath restful 路径
 * @param params restful参数
 */
export const restfulPath2path = (path: string, restful: ResultFul) => {
  let url = path;
  Object.entries(restful).forEach(([key, value]) => {
    url = url.replace(new RegExp(`:${key}`, 'g'), value)
  })
  return url;
}

type Extra = {
  _restful?: ResultFul,
  [i: string]: any,
}

type GetFn = <T extends keyof IReqGetRoutes>(url: T) => (params: IReqGetRoutes[T], extra?: Extra) => Promise<IResGetRoutes[T]>
type PostFn = <T extends keyof IReqPostRoutes>(url: T) => (params: IReqPostRoutes[T], extra?: Extra) => Promise<IResPostRoutes[T]>
type PutFn = <T extends keyof IReqPutRoutes>(url: T) => (params: IReqPutRoutes[T], extra?: Extra) => Promise<IResPutRoutes[T]>
type DeleteFn = <T extends keyof IReqDeleteRoutes>(url: T) => (params: IReqDeleteRoutes[T], extra?: Extra) => Promise<IResDeleteRoutes[T]>
export abstract class NetBase {
  abstract get<T>(url: string, params?: any, extra?: any): Promise<T>;
  abstract post<T>(url: string, params?: any, extra?: any): Promise<T>;
  abstract put<T>(url: string, params?: any, extra?: any): Promise<T>;
  abstract delete<T>(url: string, params?: any, extra?: any): Promise<T>;

  getApi: GetFn = (url) => {
    return (params, extra) => {
      const path = restfulPath2path(url as string, extra!._restful || {})
      delete extra!._restful;
      return this.get(path, params, extra);
    };
  };

  postApi: PostFn = (url) => {
    return (params, extra) => {
      const path = restfulPath2path(url as string, extra!._restful || {})
      delete extra!._restful;

      return this.post(path, params, extra);
    };
  };

  deleteApi: DeleteFn = (url) => {
    return (params, extra) => {
      const path = restfulPath2path(url as string, extra!._restful || {})
      delete extra!._restful;
      return this.delete(path, params, extra);
    };
  };

  putApi: PutFn = (url) => {
    return (params, extra) => {
      const path = restfulPath2path(url as string, extra!._restful || {})
      delete extra!._restful;
      return this.put(path, params, extra);
    };
  };
}
