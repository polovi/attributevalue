export interface AttributeValue {
    NULL?: boolean;
    BOOL?: boolean;
    S?: string;
    N?: string;
    B?: ArrayBuffer | ArrayBufferView;
    M?: {
        [key: string]: AttributeValue;
    };
    L?: Array<AttributeValue>;
    SS?: Array<string>;
    NS?: Array<string>;
    BS?: Array<ArrayBuffer | ArrayBufferView>;
}
