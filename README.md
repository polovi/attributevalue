# attributevalue

Smaller, simpler and faster version of [@aws-sdk/util-dynamodb](https://www.npmjs.com/package/@aws-sdk/util-dynamodb). Support only basic types based on [AttributeValue](https://www.npmjs.com/package/@aws-sdk/client-dynamodb) from dynamodb sdk client

```ts
import attributevalue from 'attributevalue'

/*
{ 
  M: { 
    key: { S: 'name' }, 
    value: { S: 'John Doe' } 
  } 
}
*/
attributevalue.marshal({ key: 'name', value: 'John Doe' })

/*
{
  key: { S: 'name' },
  value: { S: 'John Doe' },
}
*/
attributevalue.marshalMap({ key: 'name', value: 'John Doe' })

//[ { S: 'Hello World' } ]
attributevalue.marshalList(['Hello World'])
```

```ts
import attributevalue from 'attributevalue'

// { key: 'name', value: 'John Doe' }
attributevalue.unmarshal({
  M: {
    key: { S: 'name' },
    value: { S: 'John Doe' },
  },
})

// { key: 'name', value: 'John Doe' }
attributevalue.unmarshalMap({
  key: { S: 'name' },
  value: { S: 'John Doe' },
})

// [ 'Hello World' ]
attributevalue.unmarshalList([{ S: 'Hello World' }])

/*
[
  { key: 'name', value: 'John Doe' },
  { key: 'name', value: 'Jane Doe' }
]
*/
attributevalue.unmarshalListOfMaps([
  {
    key: { S: 'name' },
    value: { S: 'John Doe' },
  },
  {
    key: { S: 'name' },
    value: { S: 'Jane Doe' },
  },
])
```
