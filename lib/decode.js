"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnmarshalTypeError = exports.unmarshalListOfMaps = exports.unmarshalList = exports.unmarshalMap = exports.unmarshal = void 0;
exports.unmarshal = (av) => decode(av);
exports.unmarshalMap = (m) => decode({ M: m });
exports.unmarshalList = (l) => decode({ L: l });
exports.unmarshalListOfMaps = (l) => {
    return exports.unmarshalList(l.map((m) => ({ M: m })));
};
const decode = (av) => {
    if (!av || av.NULL !== undefined) {
        return null;
    }
    else if (av.S !== undefined) {
        return av.S;
    }
    else if (av.N !== undefined) {
        return Number(av.N);
    }
    else if (av.L !== undefined) {
        return av.L.map(decode);
    }
    else if (av.M !== undefined) {
        return decodeMap(av.M);
    }
    else if (av.BOOL !== undefined) {
        return av.BOOL;
    }
    else if (av.SS !== undefined) {
        return new Set(av.SS);
    }
    else if (av.NS !== undefined) {
        return new Set(av.NS);
    }
    throw new UnmarshalTypeError('cannot unmarshal');
};
const decodeMap = (avMap = {}) => {
    const o = {};
    for (const key in avMap) {
        o[key] = decode(avMap[key]);
    }
    return o;
};
class UnmarshalTypeError extends Error {
    constructor() {
        super(...arguments);
        this.name = 'UnmarshalTypeError';
    }
}
exports.UnmarshalTypeError = UnmarshalTypeError;
