"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const decoder = require("./decoder");
function unmarshal(av) {
    return decoder.decode(av);
}
exports.unmarshal = unmarshal;
function unmarshalMap(m) {
    return decoder.decode({ M: m });
}
exports.unmarshalMap = unmarshalMap;
