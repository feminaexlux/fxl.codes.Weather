import RGB from "./rgb"

export default class HSL {
    hue: number
    saturation: number
    lightness: number

    constructor(hue: number, saturation: number, lightness: number) {
        this.hue = (hue + 360) % 360
        this.saturation = saturation
        this.lightness = lightness
    }

    // https://en.wikipedia.org/wiki/HSL_and_HSV
    public static fromRgb(rgb: RGB) {
        const redValue = rgb.red / 255,
            greenValue = rgb.green / 255,
            blueValue = rgb.blue / 255,
            max = Math.max(redValue, greenValue, blueValue),
            min = Math.min(redValue, greenValue, blueValue),
            chroma = max - min,
            lightness = .5 * (max + min),
            saturation = 1 - (3 / (redValue + greenValue + blueValue)) * Math.min(redValue, greenValue, blueValue)

        let huePrime = 0
        if (chroma != 0) {
            if (redValue == max) huePrime = ((greenValue - blueValue) / chroma) % 6
            else if (greenValue == max) huePrime = ((blueValue - redValue) / chroma) + 2
            else huePrime = ((redValue - greenValue) / chroma) + 4
        }

        return new HSL(huePrime * 60, saturation, lightness)
    }

    public static fromHex(color: number): HSL {
        return HSL.fromRgb(RGB.fromHex(color))
    }

    public toHex(): number {
        return RGB.fromHsl(this).toHex()
    }
}