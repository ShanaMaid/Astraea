declare const _default: {
    json: (json: import("./adapters/json").IJson, dir: string, opt?: import("./adapters/json").IOpt | undefined) => void;
    swagger: (swagger: any, dir: string, opt?: import("./adapters/swagger").IOpt | undefined) => Promise<void>;
    scan: (options: import("./adapters/scan").IOptions) => void;
};
export default _default;
