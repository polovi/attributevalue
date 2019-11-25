# aws-lambda-dynamodbattribute

```ts
import * as dynamodbattribute from 'aws-lambda-dynamodbattribute'

interface Item {
  nullvalue: any
  bvalue: boolean
  svalue: string
  nvalue1: number
  nvalue2: number
  nvalue3: number
  submap: { [key: string]: any }
  lsvalue: string[]
  lnvalue: number[]
  lmvalue: any[]
}

const v: Item = {
  nullvalue: null,
  bvalue: true,
  svalue: 'ahoj svete',
  nvalue1: 20,
  nvalue2: 20.4,
  nvalue3: 20.45e10,
  submap: { sv: 'ahoj sub' },
  lsvalue: ['ahoj', 'svete'],
  lnvalue: [1, 2],
  lmvalue: [1, 'ahoj', { sv: 'ahoj', nv: 10 }],
}

const marshaled = dynamodbattribute.marshalMap(v)
console.log(marshaled)

const unmarshaled = dynamodbattribute.unmarshalMap<Item>(marshaled)
console.log(unmarshaled)
```

## Status

### Implemented

- String
- Number
- Boolean
- Null
- List
- Map

### Missing

- binnary formats / Set
