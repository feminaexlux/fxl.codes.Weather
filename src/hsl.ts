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

    // https://en.wikipedia.org/wiki/RGB_color_model
    public static fromRgb(rgb: RGB) {
        const redValue = rgb.red / 255,
            greenValue = rgb.green / 255,
            blueValue = rgb.blue / 255,
            lightness = (redValue + greenValue + blueValue) / 3,
            saturation = 1 - (3 / (redValue + greenValue + blueValue)) * Math.min(redValue, greenValue, blueValue)

        const dividend = (redValue - greenValue) + (redValue - blueValue)
        const divisor = 2 * Math.sqrt((redValue - greenValue) ^ 2 + (redValue - blueValue) * (greenValue - blueValue))
        let hue = (1 / Math.cos(dividend / divisor))
        if (greenValue > blueValue) hue = 360 - hue

        return new HSL(hue, saturation, lightness)
    }

    public static fromHex(color: number): HSL {
        const red = color >> 16
        const green = (color - (red << 16)) >> 8
        const blue = color - (red << 16) - (green << 8)
        return HSL.fromRgb(new RGB(red, green, blue))
    }

    public toHex(): number {
        return RGB.fromHsl(this).toHex()
    }
}