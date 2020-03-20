# JS

### Installation

```bash
npm i ezmsg-web
```

### Features

- Tiny (~1KB).
- Ready to use with Typescript (this library is written in Typescript actually).

### Basic usage

```js
// Import
import { BType, serialize, deserialize } from 'ezmsg-web';

// Define schema
const schema = {
  id: BType.U8,
  name: BType.STR,
  age: BType.U8,
  isMarried: BType.BOOL
};

// Define data
const data = {
  id: 1,
  name: 'John',
  age: 28,
  isMarried: false
}

// Serialize
const buffer = serialize(data, schema);
// buffer: <24 01 24 4a 6f 68 6e 1c 00>

// Deserialize
const result = deserialize(buffer, schema);
```

### Array and Object type

```js
// Import
import { BType, serialize, deserialize } from 'ezmsg-web';

// Define schema
const foodSchema = {
  id: BType.U8,
  name: BType.STR,
  price: BType.U32
};

const schema = {
  id: BType.U8,
  name: BType.STR,
  age: BType.U8,
  isMarried: BType.BOOL,
  favoriteFood: foodSchema,
  hatedFoods: [foodSchema]
};

// Define data
const data = {
  id: 1,
  name: 'John',
  age: 28,
  isMarried: false,
  favoriteFood: {
    id: 1,
    name: 'Banana',
    price: 100
  },
  hatedFoods: [{
    id: 2,
    name: 'Cabbage',
    price: 50
  }, {
    id: 3,
    name: 'Carrot',
    price: 75
  }]
}

// Serialize
const buffer = serialize(data, schema);

// Deserialize
const result = deserialize(buffer, schema);
```

### Caveats
- There will be decimal errors when deserializing f32 and f64 values. It is recommended that you always round it when you are going to use the value.
