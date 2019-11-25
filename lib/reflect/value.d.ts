export declare const Invalid = "undefined";
export declare const String = "string";
export declare const Number = "number";
export declare const Bool = "boolean";
export declare const Map = "map";
export declare const Set = "set";
export declare const Object = "object";
export declare const Function = "function";
export declare const Array = "array";
export declare const Buffer = "buffer";
export declare const Stream = "stream";
export interface Value<T> {
    value(): T | undefined;
    kind(): string;
    type(): string;
    toString(): string;
    isValid(): boolean;
}
export declare function Value<T>(v?: T | undefined, k?: string): Value<T>;
