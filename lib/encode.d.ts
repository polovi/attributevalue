import { AttributeValue } from '@aws-sdk/client-dynamodb';
export interface Encoder {
    nullEmptyString?: boolean;
    omitEmpty?: boolean;
}
export declare const marshal: (i: any, e?: Encoder) => AttributeValue;
export declare function marshalMap(i: any, e?: Encoder): {
    [key: string]: AttributeValue;
};
export declare function marshalList(i: any, e?: Encoder): AttributeValue[];
export declare class UnsupportedMarshalTypeError extends Error {
    name: string;
}
export declare class InvalidMarshalError extends Error {
    name: string;
}
