"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reflect = require("./reflect");
function encode(i) {
    const v = reflect.valueOf(i);
    switch (v.kind()) {
        case reflect.Invalid:
            return encodeNull();
        case reflect.Object:
            return encodeStruct(v);
        case reflect.Array:
            return encodeArray(v);
        case reflect.Buffer:
        case reflect.Set:
            throw Error('Not implemented yet');
        case reflect.Map:
        case reflect.Stream:
            throw Error('Unsupported data');
        default:
            return encodeScalar(v);
    }
}
exports.encode = encode;
function encodeNull() {
    return { NULL: true };
}
function encodeString(v) {
    return { S: String(v.value()) };
}
function encodeNumber(v) {
    return { N: String(v.value()) };
}
function encodeScalar(v) {
    switch (v.kind()) {
        case reflect.Bool:
            return { BOOL: Boolean(v.value()) };
        case reflect.String:
            return encodeString(v);
        default:
            return encodeNumber(v);
    }
}
function encodeStruct(v) {
    return {
        M: Object.keys(v.value()).reduce((o, key) => ({ ...o, ...{ [key]: encode(v.value()[key]) } }), {}),
    };
}
function encodeArray(v) {
    return {
        L: v.value().reduce((o, val) => [...o, encode(val)], []),
    };
}
