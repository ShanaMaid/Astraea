import { IOpt } from './json';
export interface IOptions {
    inputDir: string;
    outputDir: string;
    request?: IOpt;
    response?: IOpt;
}
declare const scan: (options: IOptions) => void;
export default scan;
