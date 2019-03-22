export interface IApi {
    [index: string]: any;
}
export interface IJson {
    get?: IApi;
    post?: IApi;
    put?: IApi;
    delete?: IApi;
}
declare const _default: (json: IJson, dir: string, opt?: {
    blackList?: string[] | undefined;
    optional?: boolean | undefined;
} | undefined) => void;
export default _default;
