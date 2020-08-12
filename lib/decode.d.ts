import { AttributeValue } from '@aws-sdk/client-dynamodb';
export declare const unmarshal: <T>(av: AttributeValue) => T;
export declare const unmarshalMap: <T extends object>(m: {
    [key: string]: AttributeValue;
}) => T;
export declare const unmarshalList: <T extends any[]>(l: AttributeValue[]) => T;
export declare const unmarshalListOfMaps: <T extends any[]>(l: {
    [key: string]: AttributeValue;
}[]) => T;
export declare class UnmarshalTypeError extends Error {
    name: string;
}
