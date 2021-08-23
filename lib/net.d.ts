/**
 * 网络库接入高阶函数
 * 减少对代码的侵入
 */
export interface IReqGetRoutes {
}
export interface IResGetRoutes {
}
export interface IReqPostRoutes {
}
export interface IResPostRoutes {
}
export interface IReqPutRoutes {
}
export interface IResPutRoutes {
}
export interface IReqDeleteRoutes {
}
export interface IResDeleteRoutes {
}
export declare type ResultFul = {
    [i: string]: string;
};
export declare type Options = {
    restful: ResultFul;
};
/**
 * restfulPath: /asas/:name/:id
 * restful: { name: 'goods', id: '121212'}
 * path: /asas/goods/121212
 * @param restfulPath restful 路径
 * @param params restful参数
 */
export declare const restfulPath2path: (path: string, restful: ResultFul) => string;
declare type Extra = {
    _restful?: ResultFul;
    [i: string]: any;
};
declare type GetFn = <T extends keyof IReqGetRoutes>(url: T) => (params: IReqGetRoutes[T], extra?: Extra) => Promise<IResGetRoutes[T]>;
declare type PostFn = <T extends keyof IReqPostRoutes>(url: T) => (params: IReqPostRoutes[T], extra?: Extra) => Promise<IResPostRoutes[T]>;
declare type PutFn = <T extends keyof IReqPutRoutes>(url: T) => (params: IReqPutRoutes[T], extra?: Extra) => Promise<IResPutRoutes[T]>;
declare type DeleteFn = <T extends keyof IReqDeleteRoutes>(url: T) => (params: IReqDeleteRoutes[T], extra?: Extra) => Promise<IResDeleteRoutes[T]>;
export declare abstract class NetBase {
    abstract get<T>(url: string, params?: any, extra?: any): Promise<T>;
    abstract post<T>(url: string, params?: any, extra?: any): Promise<T>;
    abstract put<T>(url: string, params?: any, extra?: any): Promise<T>;
    abstract delete<T>(url: string, params?: any, extra?: any): Promise<T>;
    getApi: GetFn;
    postApi: PostFn;
    deleteApi: DeleteFn;
    putApi: PutFn;
}
export {};
