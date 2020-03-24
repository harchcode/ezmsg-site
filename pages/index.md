---
title: Home
description: Tiny data transfer for the web.
---

## Why should you use EzMsg

Data transfer between web browser and server are usually done with JSON data, which is in text format. This library helps to create a simple binary format that can be sent/received to/from server. The main advantage of data transfer using binary format is the size.

EzMsg aims to be used as the data transfer for web application, replacing JSON data.

<div class="mt-4 bg-yellow-100 font-mono border-2 border-gray-900 border-x1 overflow-hidden">
  <div class="bg-red-200 p-4 border border-gray-900 border-x3">
    <div class="text-2xl">{ "compact": true, "schema": "yes!" }</div>
    <div class="flex items-center mt-4">
      <div class="text-xl font-bold w-16">JSON</div>
      <div class="ml-2 text-right w-20">32 bytes</div>
    </div>
  </div>
  <div class="bg-green-200 p-4 border border-gray-900 border-x2">
    <div class="text-2xl">&lt;22 01 24 79 65 73 21&gt;</div>
    <div class="flex items-center mt-4">
      <div class="text-xl font-bold w-16">EzMsg</div>
      <div class="ml-2 text-right w-20">7 bytes</div>
      <div class="ml-4 text-xl">🎉</div>
    </div>
  </div>
</div>

## Before you get started

You need to know about these 3 things:

* `BType`: An enum for types. Available values are: `BType.U8`, `BType.U16`, `BType.U32`, `BType.I8`, `BType.I16`, `BType.I32`, `BType.F32`, `BType.F64`, `BType.BOOL`, `BType.STR`.
* `serialize(value, type)`: A function for serialization. Returns buffer.
* `deserialize(buffer, type)`: A function for deserialization. Returns value.

Now, go to the [Guide Page](guide/js) to learn more.
