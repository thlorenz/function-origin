export declare type OriginInfo = {
    file?: string;
    line?: number;
    column?: number;
    inferredName?: string;
};
export declare function isNativeV8Function(fn: Function): boolean;
export declare function functionOrigin(fn: Function, safe?: boolean): OriginInfo;
//# sourceMappingURL=function-origin.d.ts.map