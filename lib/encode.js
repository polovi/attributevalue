"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidMarshalError = exports.UnsupportedMarshalTypeError = exports.marshalList = exports.marshalMap = exports.marshal = void 0;
exports.marshal = (i, e) => {
    return encode(i, {
        nullEmptyString: true,
        omitEmpty: false,
        ...e,
    });
};
function marshalMap(i, e) {
    return exports.marshal(i, e).M;
}
exports.marshalMap = marshalMap;
function marshalList(i, e) {
    return exports.marshal(i, e).L;
}
exports.marshalList = marshalList;
const encode = (i, e) => {
    if (i === null || i === undefined) {
        return encodeNull();
    }
    switch (typeof i) {
        case 'object':
            return encodeObject(i, e);
        case 'string':
            return encodeString(i, e);
        case 'number':
            return { N: String(i) };
        case 'boolean':
            return { BOOL: i };
        default:
            throw new UnsupportedMarshalTypeError(`value type ${typeof i} is not supported`);
    }
};
const encodeNull = () => ({
    NULL: true,
});
const encodeString = (s, e) => {
    if (!s && e.nullEmptyString) {
        return encodeNull();
    }
    return { S: s };
};
const encodeObject = (i, e) => {
    if (i instanceof Map) {
        return encodeMap(i, e);
    }
    else if (i instanceof Set) {
        return encodeSet(i, e);
    }
    else if (Array.isArray(i)) {
        return encodeList(i, e);
    }
    return encodeStruct(i, e);
};
const encodeStruct = (o, e) => {
    const av = { M: {} };
    for (let name in o) {
        if (!name) {
            throw new InvalidMarshalError('struct key cannot be empty');
        }
        let elem = encode(o[name], e);
        if (elem.NULL && e.omitEmpty) {
            continue;
        }
        av.M[name] = elem;
    }
    return av;
};
const encodeMap = (m, e) => {
    const av = { M: {} };
    for (let [name, value] of m) {
        if (!name) {
            throw new InvalidMarshalError('map key cannot be empty');
        }
        let elem = encode(value, e);
        if (elem.NULL && e.omitEmpty) {
            continue;
        }
        av.M[name] = elem;
    }
    return av;
};
const encodeSet = (s, e) => {
    if (!s.size) {
        throw new InvalidMarshalError('set must only contain non-null numbers or strings');
    }
    const t = typeof s[Symbol.iterator]().next().value;
    const av = {};
    let elemFn;
    switch (t) {
        case 'number':
            av.NS = [];
            elemFn = (elem) => {
                if (!elem.N) {
                    throw new InvalidMarshalError('number set must only contain non-null numbers');
                }
                av.NS.push(elem.N);
            };
            break;
        case 'string':
            av.SS = [];
            elemFn = (elem) => {
                if (!elem.S) {
                    throw new InvalidMarshalError('string set must only contain non-null strings');
                }
                av.SS.push(elem.S);
            };
            break;
        default:
            throw new UnsupportedMarshalTypeError(`value type ${t} is not supported in set`);
    }
    encodeCollection(s, elemFn, e);
    return av;
};
const encodeList = (a, e) => {
    const av = { L: [] };
    encodeCollection(a, (elem) => av.L.push(elem), e);
    return av;
};
const encodeCollection = (i, elemFn, e) => {
    for (let item of i) {
        const elem = encode(item, { omitEmpty: e.omitEmpty });
        if (elem.NULL && e.omitEmpty) {
            continue;
        }
        elemFn(elem);
    }
};
class UnsupportedMarshalTypeError extends Error {
    constructor() {
        super(...arguments);
        this.name = 'UnsupportedMarshalTypeError';
    }
}
exports.UnsupportedMarshalTypeError = UnsupportedMarshalTypeError;
class InvalidMarshalError extends Error {
    constructor() {
        super(...arguments);
        this.name = 'InvalidMarshalError';
    }
}
exports.InvalidMarshalError = InvalidMarshalError;
