"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOf = exports.Uint8Array = exports.Buffer = exports.Map = exports.Set = exports.Array = exports.Object = exports.Bool = exports.Number = exports.String = exports.Invalid = void 0;
exports.Invalid = 'invalid';
exports.String = 'string';
exports.Number = 'number';
exports.Bool = 'boolean';
exports.Object = 'object';
exports.Array = 'array';
exports.Set = 'set';
exports.Map = 'map';
exports.Buffer = 'buffer';
exports.Uint8Array = 'uint8array';
function typeOf(i) {
    return toType(i);
}
exports.typeOf = typeOf;
function toType(i) {
    const t = tname(i);
    return {
        kind: t,
        elem() {
            if (t !== exports.Set) {
                throw Error(`invalid type ${t}`);
            }
            return elemType(i);
        },
    };
}
function tname(i) {
    if (i === null || i === undefined) {
        return exports.Invalid;
    }
    const match = i.constructor.toString().match(/^\s*function (.+)\(/);
    return match ? match[1].toString().toLowerCase() : typeof i;
}
function elemType(s) {
    let rtype = null;
    for (const v of s) {
        const t = typeOf(v);
        if (rtype !== null && rtype.kind !== t.kind) {
            rtype = typeOf({});
            break;
        }
        rtype = t;
    }
    return rtype;
}
