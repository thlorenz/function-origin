export declare const EMPTY_ORIGIN_INFO: OriginInfo;
export declare type OriginInfo = {
    file?: string;
    line?: number;
    column?: number;
    inferredName?: string;
};
export declare function isUnboundNativeFunction(fn: Function): boolean;
export declare function functionOrigin(fn: Function): OriginInfo;
//# sourceMappingURL=function-origin.d.ts.map