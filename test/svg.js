"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const color_1 = require("webui/element/color");
const ellipse_1 = require("webui/element/ellipse");
const bytes_1 = require("webui/encode/bytes");
const Willow = artifacts.require("Willow");
contract("assert svg", ([alice]) => {
    let contractInstance;
    beforeEach(async () => {
        contractInstance = await Willow.new();
    });
    it("rect", async () => {
        await contractInstance.create([
            (0, bytes_1.bytes)([0x01, 10, 30, 100, 150, 0xf0, 0x0f, 0x00, 0x00]),
            (0, bytes_1.bytes)([0x01, 100, 50, 200, 100, 0x0a, 0xaf, 0x00, 0x00]),
        ], { from: alice });
        const svg = await contractInstance.draw(0);
        return assert.equal(svg, await fs_1.promises.readFile(`${__dirname}/svgs/a.svg`, { encoding: 'utf-8' }));
    });
    it("ellipse", async () => {
        await contractInstance.create([
            (0, ellipse_1.ellipse)({ x: 100, y: 50, cx: 60, cy: 30, fill: (0, color_1.rgba)(1, 2, 3, 4), stroke: (0, color_1.rgba)(5, 6, 7, 8) }),
            (0, ellipse_1.ellipse)({ x: 200, y: 150, cx: 40, cy: 80, fill: (0, color_1.rgba)(8, 7, 6, 5), stroke: (0, color_1.rgba)(4, 3, 2, 1) }),
        ].map((e) => e.encode()).map(bytes_1.bytes));
        const svg = await contractInstance.draw(0);
        return assert.equal(svg, await fs_1.promises.readFile(`${__dirname}/svgs/ellipses.svg`, { encoding: 'utf-8' }));
    });
});
