"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rgba = exports.color = void 0;
const color = ({ r, g, b, a }) => ({
    encode: () => [pack(r, g), pack(b, a)]
});
exports.color = color;
const rgba = (r, g, b, a) => ({ r, g, b, a });
exports.rgba = rgba;
const pack = (a, b) => (a * 16 + b) % 256;
