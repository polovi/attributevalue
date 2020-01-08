"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function unmarshal(av) {
    return decode(av);
}
exports.unmarshal = unmarshal;
function unmarshalMap(m) {
    return decode({ M: m });
}
exports.unmarshalMap = unmarshalMap;
function unmarshalList(l) {
    return decode({ L: l });
}
exports.unmarshalList = unmarshalList;
function decode(av) {
    if (!av || !!av.NULL) {
        return null;
    }
    if ('BOOL' in av) {
        return av.BOOL;
    }
    else if ('S' in av) {
        return av.S;
    }
    else if ('N' in av) {
        return Number(av.N);
    }
    else if ('B' in av) {
        return av.B;
    }
    else if ('L' in av) {
        return decodeList(av.L);
    }
    else if ('M' in av) {
        return decodeMap(av.M);
    }
    else if ('SS' in av) {
        return decodeStringSet(av.SS);
    }
    else if ('NS' in av) {
        return decodeNumberSet(av.NS);
    }
    else if ('BS' in av) {
        return decodeBinarySet(av.BS);
    }
    return null;
}
exports.decode = decode;
function decodeList(avList) {
    if (!Array.isArray(avList) || !avList.length) {
        return [];
    }
    return avList.reduce((out, i) => [...out, decode(i)], []);
}
function decodeMap(avMap) {
    return Object.keys(avMap || {}).reduce((out, k) => ({
        ...out,
        ...{ [k]: decode(avMap[k]) },
    }), {});
}
function decodeStringSet(ss) {
    return new Set(ss);
}
function decodeNumberSet(ns) {
    return new Set(ns.map(v => Number(v)));
}
function decodeBinarySet(ns) {
    return new Set(ns);
}
