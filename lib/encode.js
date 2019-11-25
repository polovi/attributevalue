"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const encoder = require("./encoder");
function marshal(i) {
    return encoder.encode(i);
}
exports.marshal = marshal;
function marshalMap(i) {
    return encoder.encode(i).M;
}
exports.marshalMap = marshalMap;
