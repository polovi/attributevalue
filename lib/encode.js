"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reflect = require("./reflect");
function marshal(i) {
    return encode(i);
}
exports.marshal = marshal;
function marshalMap(i) {
    return encode(i).M;
}
exports.marshalMap = marshalMap;
function marshalList(i) {
    return encode(i).L;
}
exports.marshalList = marshalList;
function encode(i) {
    const t = reflect.typeOf(i);
    switch (t.kind) {
        case reflect.Invalid:
            return { NULL: true };
        case reflect.String:
            return { S: String(i) };
        case reflect.Number:
            return { N: String(i) };
        case reflect.Bool:
            return { BOOL: Boolean(i) };
        case reflect.Array:
            return encodeArray(i);
        case reflect.Map:
            return encodeMap(i);
        case reflect.Object:
            return encodeStruct(i);
        case reflect.Set:
            return encodeSet(i, t);
        case reflect.Buffer:
        case reflect.Uint8Array:
            return encodeBinary(i);
        default:
            throw Error('invalid');
    }
}
exports.encode = encode;
function encodeMap(m) {
    const av = { M: {} };
    m.forEach((v, k) => (av.M[String(k)] = encode(v)));
    return av;
}
function encodeStruct(o) {
    return {
        M: Object.keys(o).reduce((out, key) => ({
            ...out,
            ...{ [String(key)]: encode(o[key]) },
        }), {}),
    };
}
function encodeArray(a) {
    return { L: a.map(encode) };
}
function encodeSet(s, t) {
    let av;
    switch (t.elem().kind) {
        case reflect.String:
            av = { SS: [] };
            s.forEach(v => av.SS.push(String(v)));
            break;
        case reflect.Number:
            av = { NS: [] };
            s.forEach(v => av.NS.push(String(v)));
            break;
        case reflect.Buffer:
        case reflect.Uint8Array:
            av = { BS: [] };
            s.forEach(v => av.BS.push(v));
            break;
        default:
            throw Error('invalid set type');
    }
    return av;
}
function encodeBinary(b) {
    return { B: b };
}
