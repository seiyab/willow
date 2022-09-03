"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bytes = void 0;
const bytes = (xs) => '0x' + xs.map(hexByte).join('');
exports.bytes = bytes;
const hexByte = (x) => `${digits[Math.floor(x / 16) % 16]}${digits[x % 16]}`;
const digits = '0123456789abcdef';
