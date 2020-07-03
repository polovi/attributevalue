import { AttributeValue } from '@aws-sdk/client-dynamodb';
export declare function unmarshal<T>(av: AttributeValue): T;
export declare function unmarshalMap<T extends object>(m: {
    [key: string]: AttributeValue;
}): T;
export declare function unmarshalList<T extends any[]>(l: AttributeValue[]): T;
export declare function decode(av: AttributeValue): any;
