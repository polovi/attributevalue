import { AttributeValue } from '@aws-sdk/client-dynamodb'
export interface EncoderOptions {
  NullEmptySets: boolean
}
export declare const marshal: (i: any, e?: EncoderOptions) => AttributeValue
export declare const marshalMap: (
  i: any,
  e?: EncoderOptions
) => {
  [key: string]: AttributeValue
}
export declare const marshalList: (i: any, e?: EncoderOptions) => AttributeValue[]
