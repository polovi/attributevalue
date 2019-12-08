export declare type Kind = string;
export declare const Invalid: Kind;
export declare const String: Kind;
export declare const Number: Kind;
export declare const Bool: Kind;
export declare const Object: Kind;
export declare const Array: Kind;
export declare const Set: Kind;
export declare const Map: Kind;
export declare const Buffer: Kind;
export declare const Uint8Array: Kind;
export interface Type {
    kind: Kind;
    elem(): Type;
}
export declare function typeOf<T>(i: T): Type;
