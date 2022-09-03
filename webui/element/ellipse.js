"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ellipse = void 0;
const color_1 = require("./color");
const ellipse = ({ x, y, cx, cy, fill, stroke }) => {
    const [f, s] = [(0, color_1.color)(fill), (0, color_1.color)(stroke)];
    const encode = () => [
        0x02, x, y, cx, cy, ...f.encode(), ...s.encode()
    ];
    return ({
        encode,
    });
};
exports.ellipse = ellipse;
