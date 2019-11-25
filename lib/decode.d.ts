import { AttributeValue } from './attributevalue';
export declare function unmarshal<T>(av: AttributeValue): T;
export declare function unmarshalMap<T>(m: {
    [key: string]: AttributeValue;
}): T;
