import HSL from "../src/hsl"
import RGB from "../src/rgb"

describe("HSL", () => {
    const names = ["red", "green", "blue", "F0C80E", "7E7EB8"]

    const values = [
        new RGB(255, 0, 0),
        new RGB(0, 255, 0),
        new RGB(0, 0, 255),
        new RGB(240, 200, 14),
        new RGB(126, 126, 184)
    ]

    const expected = [
        new HSL(0, 1, .5),
        new HSL(120, 1, .5),
        new HSL(240, 1, .5),
        new HSL(49, .89, .5),
        new HSL(240, .29, .61)
    ]

    for (let index = 0; index < names.length; index++) {
        it(`should match provided value: ${names[index]}`, () => {
            const value = HSL.fromRgb(values[index])
            expect(value.hue).toBeCloseTo(expected[index].hue, .1)
            expect(value.lightness).toBeCloseTo(expected[index].lightness, .01)
            expect(value.saturation).toBeCloseTo(expected[index].saturation, .01)
        })
    }
})