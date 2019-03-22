declare const _default: {
    json: (json: import("./adapters/json").IJson, dir: string, opt?: {
        blackList?: string[] | undefined;
        optional?: boolean | undefined;
    } | undefined) => void;
    swagger: (swagger: any, dir: string, opt?: {
        blackList?: string[] | undefined;
        optional?: boolean | undefined;
    } | undefined) => Promise<void>;
};
export default _default;
