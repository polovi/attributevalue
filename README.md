# dynamodbattribute

```ts
import * as dynamodbattribute from 'dynamodbattribute'

interface Item {
  nullvalue: any
  bvalue: boolean
  svalue: string
  nvalue: number
  bvalue: Buffer
  submap: { [key: string]: any }
  lsvalue: string[]
  lnvalue: number[]
  lmvalue: any[]
  sset: Set<string>
  nset: Set<number>
  bset: Set<Uint8Array>
}

const v: Item = {
  nullvalue: null,
  bvalue: true,
  svalue: 'ahoj svete',
  nvalue: 20,
  bvalue: Buffer.from('hello world'),
  submap: { sv: 'ahoj sub' },
  lsvalue: ['ahoj', 'svete'],
  lnvalue: [1, 2],
  lmvalue: [1, 'ahoj', { sv: 'ahoj', nv: 10 }],
  sset: new Set(['hello', 'world']),
  nset: new Set([123, 456]),
  bset: new Set([new Uint8Array([27]), new Uint8Array([13])]),
}

const marshaled = dynamodbattribute.marshalMap(v)
console.log(marshaled)

const unmarshaled = dynamodbattribute.unmarshalMap<Item>(marshaled)
console.log(unmarshaled)
```

## Status

### Implemented data types

- Null
- String
- Number
- Boolean
- Buffer | Uint8Array
- List
- Map
- Object
- Set\<string\>
- Set\<number\>
- Set\<Buffer\>
- Set\<Uint8Array\>
