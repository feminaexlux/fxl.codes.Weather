import HSL from "../src/hsl"
import RGB from "../src/rgb"

describe("HSL", () => {
    it("should match provided base RBG values", () => {
        const red = HSL.fromRgb(new RGB(255, 0, 0))
        expect(red.hue).toEqual(0)
        expect(red.lightness).toEqual(.5)
        expect(red.saturation).toEqual(1)

        const green = HSL.fromRgb(new RGB(0, 255, 0))
        expect(green.hue).toEqual(120)
        expect(green.lightness).toEqual(.5)
        expect(green.saturation).toEqual(1)

        const blue = HSL.fromRgb(new RGB(0, 0, 255))
        expect(blue.hue).toEqual(240)
        expect(blue.lightness).toEqual(.5)
        expect(blue.saturation).toEqual(1)
    })
})