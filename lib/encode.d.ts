import { AttributeValue } from '@aws-sdk/client-dynamodb';
export declare function marshal(i: any): AttributeValue;
export declare function marshalMap(i: any): {
    [key: string]: AttributeValue;
};
export declare function marshalList(i: any): AttributeValue[];
export declare function encode(i: any): AttributeValue;
