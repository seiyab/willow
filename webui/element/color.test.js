"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const color_1 = require("./color");
describe("rgba().encode()", () => {
    [
        [(0, color_1.rgba)(1, 2, 3, 4), [0x12, 0x34]],
    ].forEach(([c, bytes]) => {
        it(JSON.stringify(c), () => {
            assert_1.default.deepEqual((0, color_1.color)(c).encode(), bytes);
        });
    });
});
