import RGB from "../src/rgb"

describe("RGB", () => {
    const hexes = [0xED7651, 0x1EAC41, 0xBF40BF]
    const expected = [
        new RGB(237, 118, 81),
        new RGB(30, 172, 65),
        new RGB(191, 64, 191),
    ]

    for (let index = 0; index < hexes.length; index++) {
        it(`should match provided value: ${hexes[index].toString(16)}`, () => {
            const value = RGB.fromHex(hexes[index])
            expect(value.red).toEqual(expected[index].red)
            expect(value.blue).toEqual(expected[index].blue)
            expect(value.green).toEqual(expected[index].green)
        })
    }
})