declare const _default: {
    json: (json: import("./adapters/json").IJson, dir: string, blackList?: string[] | undefined) => void;
    swagger: (swagger: any, dir: string, blackList?: string[] | undefined) => Promise<void>;
};
export default _default;
