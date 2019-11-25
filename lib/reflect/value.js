"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const s = require("stream");
exports.Invalid = 'undefined';
exports.String = 'string';
exports.Number = 'number';
exports.Bool = 'boolean';
exports.Map = 'map';
exports.Set = 'set';
exports.Object = 'object';
exports.Function = 'function';
exports.Array = 'array';
exports.Buffer = 'buffer';
exports.Stream = 'stream';
function Value(v = undefined, k = 'undefined') {
    return {
        value() {
            return v;
        },
        kind() {
            if (v instanceof s.Stream) {
                return 'stream';
            }
            if (['uint8array', 'uint16array', 'uint32array', 'array', 'arraybuffer'].includes(k)) {
                return 'array';
            }
            return k;
        },
        type() {
            return k;
        },
        toString() {
            return this.value.constructor.toString();
        },
        isValid() {
            return !!this.value;
        },
    };
}
exports.Value = Value;
