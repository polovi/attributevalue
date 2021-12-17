import { AttributeValue } from '@aws-sdk/client-dynamodb'
export declare const unmarshal: (av: AttributeValue) => any
export declare const unmarshalMap: (m: { [key: string]: AttributeValue }) => any
export declare const unmarshalList: (l: AttributeValue[]) => any
export declare const unmarshalListOfMaps: (
  l: {
    [key: string]: AttributeValue
  }[]
) => any
