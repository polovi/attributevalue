"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const value_1 = require("./value");
function valueOf(i) {
    if (!i) {
        return value_1.Value();
    }
    return inspect(i);
}
exports.valueOf = valueOf;
function cname(type) {
    var str = type.toString();
    var match = str.match(/^\s*function (.+)\(/);
    return String(match ? match[1] : undefined).toLowerCase();
}
function inspect(i) {
    const t = typeof i;
    switch (t) {
        case 'string':
        case 'number':
            return value_1.Value(i, t);
        default:
            return inspectObject(i);
    }
}
function inspectObject(i) {
    const cn = cname(i.constructor);
    return value_1.Value(i, cn);
}
