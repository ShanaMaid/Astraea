export interface IApi {
    [index: string]: any;
}
export interface IJson {
    get?: IApi;
    post?: IApi;
    put?: IApi;
    delete?: IApi;
}
export interface IOpt {
    blackList?: string[];
    optional?: boolean;
    suffix?: string;
}
declare const _default: (json: IJson, dir: string, opt?: IOpt | undefined) => void;
export default _default;
