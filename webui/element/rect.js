"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rect = void 0;
const color_1 = require("./color");
const rect = ({ x, y, width, height, fill, stroke }) => {
    const [f, s] = [(0, color_1.color)(fill), (0, color_1.color)(stroke)];
    const encode = () => [
        0x01, x, y, width, height, ...f.encode(), ...s.encode()
    ];
    return ({
        encode,
    });
};
exports.rect = rect;
