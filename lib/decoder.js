"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function decode(av) {
    if ('M' in av) {
        return decodeMap(av.M);
    }
    else if ('L' in av) {
        return decodeList(av.L);
    }
    else if ('BOOL' in av) {
        return decodeBool(av.BOOL);
    }
    else if ('S' in av) {
        return decodeString(av.S);
    }
    else if ('N' in av) {
        return decodeNumber(av.N);
    }
    else if ('NULL' in av) {
        return null;
    }
    throw Error('Unsupported attribute');
}
exports.decode = decode;
function decodeMap(avMap) {
    return Object.keys(avMap).reduce((out, k) => ({
        ...out,
        ...{ [k]: decode(avMap[k]) },
    }), {});
}
function decodeList(avList) {
    return avList.reduce((out, i) => [...out, decode(i)], []);
}
function decodeBool(b) {
    return Boolean(b);
}
function decodeString(s) {
    return String(s);
}
function decodeNumber(n) {
    return Number(n);
}
