export interface IInterface {
    fileName: string;
    method: string;
    path: string;
    content: string;
}
export interface IMethodInterfaces {
    [index: string]: string[];
}
/**
 * 输出route描述文件
 * @param interfaces interface相关描述数组
 * @param dir 输出路径
 */
declare const outfile: (interfaces: IInterface[], dir: string) => void;
export default outfile;
