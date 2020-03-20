## API

You only need to know about these 3 things:
- `BType`: An enum for types. Available values are: `BType.U8`, `BType.U16`, `BType.U32`, `BType.I8`, `BType.I16`, `BType.I32`, `BType.F32`, `BType.F64`, `BType.BOOL`, `BType.STR`.
- `serialize(value, type)`: A function for serialization. Returns buffer.
- `deserialize(buffer, type)`: A function for deserialization. Returns value.
