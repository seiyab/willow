import assert from 'assert';
import { color, rgba } from './color';

describe("rgba().encode()", () => {
    ([
        [rgba(1, 2, 3, 4), [0x12, 0x34]],
    ] as const).forEach(([c, bytes]) => {
        it(JSON.stringify(c), () => {
            assert.deepEqual(color(c).encode(), bytes)
        })
    })
})