export class HSL {
    hue: number
    saturation: number
    lightness: number

    constructor(hue: number, saturation: number, lightness: number) {
        this.hue = hue
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
}

export class RGB {
    red: number
    green: number
    blue: number

    constructor(red: number, green: number, blue: number) {
        this.red = red
        this.green = green
        this.blue = blue
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

export enum Schemes {
    Analogous,
    Monochromatic,
    SplitComplementary,
    Triadic,
    Tetradic,
    Square
}