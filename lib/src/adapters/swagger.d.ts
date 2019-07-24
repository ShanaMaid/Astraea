export interface IOpt {
    blackList?: string[];
    optional?: boolean;
    suffix?: string;
}
declare const _default: (swagger: any, dir: string, opt?: IOpt | undefined) => Promise<void>;
export default _default;
