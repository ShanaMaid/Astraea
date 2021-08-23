export declare type Params = {
    sourceDir: string;
    typingDir: string;
};
export interface IInterface {
    fileName: string;
    method: string;
    url: string;
    content: string;
}
export interface IMethodInterfaces {
    [index: string]: string[];
}
export declare class Astraea {
    private params;
    constructor(p: Params);
    formatFile: (filePath: string) => IInterface | undefined;
    scanTypeFiles: (dir: string) => string[];
    /**
   * 输出route描述文件
   * @param interfaces interface相关描述数组
   * @param dir 输出路径
   */
    outfile: (interfaces: IInterface[]) => void;
    start: () => void;
}
