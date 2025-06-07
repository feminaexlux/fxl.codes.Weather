import HSL from "./hsl"

export default class RGB {
    red: number
    green: number
    blue: number

    constructor(red: number, green: number, blue: number) {
        this.red = red
        this.green = green
        this.blue = blue
    }

    toHex(): number {
        return this.red << 16 + this.green << 8 + this.blue
    }

    // https://en.wikipedia.org/wiki/HSL_and_HSV
    public static fromHsl(hsl: HSL): RGB {
        let red = 0,
            green = 0,
            blue = 0
        const saturationValue = hsl.saturation / 100,
            lightnessValue = hsl.lightness / 100,
            chroma = 1 - Math.abs(2 * hsl.lightness - 1) * saturationValue,
            range = hsl.hue / 60,
            intermediate = chroma * (1 - Math.abs(range % 2 - 1)),
            match = lightnessValue - chroma / 2

        if (range >= 0 && range < 1) {
            red = chroma
            green = intermediate
        } else if (range >= 1 && range < 2) {
            red = intermediate
            green = chroma
        } else if (range >= 2 && range < 3) {
            green = chroma
            blue = intermediate
        } else if (range >= 3 && range < 4) {
            green = intermediate
            blue = chroma
        } else if (range >= 4 && range < 5) {
            red = intermediate
            blue = chroma
        } else if (range >= 5 && range < 6) {
            red = chroma
            blue = intermediate
        }

        return new RGB((red + match) * 255, (green + match) * 255, (blue + match) * 255)
    }
}