import HSL from "./hsl"

export default class RGB {
    red: number
    green: number
    blue: number

    constructor(red: number, green: number, blue: number) {
        this.red = Math.floor(red < 0 ? 0 : red > 255 ? 255 : red)
        this.green = Math.floor(green < 0 ? 0 : green > 255 ? 255 : green)
        this.blue = Math.floor(blue < 0 ? 0 : blue > 255 ? 255 : blue)
    }

    toHex(): number {
        return (this.red << 16) + (this.green << 8) + this.blue
    }

    // https://en.wikipedia.org/wiki/HSL_and_HSV
    public static fromHsl(hsl: HSL): RGB {
        let red = 0,
            green = 0,
            blue = 0
        const chroma = (1 - Math.abs(2 * hsl.lightness - 1)) * hsl.saturation,
            range = hsl.hue / 60,
            intermediate = chroma * (1 - Math.abs(range % 2 - 1)),
            match = hsl.lightness - chroma / 2

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

    public static fromHex(color: number): RGB {
        const red = color >> 16
        const green = (color - (red << 16)) >> 8
        const blue = color - (red << 16) - (green << 8)
        return new RGB(red, green, blue)
    }
}