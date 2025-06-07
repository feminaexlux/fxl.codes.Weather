import HSL from "./hsl"

abstract class Scheme {
    protected primary: HSL
    protected constructor(initial: number) {
        this.primary = HSL.fromHex(initial)
    }

    colors: number[]
}

export class Analogous extends Scheme {
    constructor(initial: number) {
        super(initial)

        const left1 = new HSL(this.primary.hue - 60, this.primary.saturation, this.primary.lightness)
        const left2 = new HSL(this.primary.hue - 30, this.primary.saturation, this.primary.lightness)
        const right1 = new HSL(this.primary.hue + 30, this.primary.saturation, this.primary.lightness)
        const right2 = new HSL(this.primary.hue + 60, this.primary.saturation, this.primary.lightness)

        this.colors = [
            left1.toHex(),
            left2.toHex(),
            initial,
            right1.toHex(),
            right2.toHex()
        ]
    }
}

export class Monochromatic extends Scheme {
    constructor(initial: number) {
        super(initial)

        const delta = this.primary.lightness / 6
        this.colors = [
            initial,
            new HSL(this.primary.hue, this.primary.saturation, this.primary.lightness - delta).toHex(),
            new HSL(this.primary.hue, this.primary.saturation, this.primary.lightness - delta * 2).toHex(),
            new HSL(this.primary.hue, this.primary.saturation, this.primary.lightness - delta * 3).toHex(),
            new HSL(this.primary.hue, this.primary.saturation, this.primary.lightness - delta * 4).toHex()
        ]
    }
}

export class SplitComplementary extends Scheme {
    constructor(initial: number) {
        super(initial)

        const complement = new HSL((this.primary.hue + 180) % 360, this.primary.saturation, this.primary.lightness)
        this.colors = [
            initial,
            new HSL(complement.hue - 30, complement.saturation, complement.lightness).toHex(),
            new HSL(complement.hue + 30, complement.saturation, complement.lightness).toHex()
        ]
    }
}

export class Triadic extends Scheme {
    constructor(initial: number) {
        super(initial)

        this.colors = [
            initial,
            new HSL(this.primary.hue - 120, this.primary.saturation, this.primary.lightness).toHex(),
            new HSL(this.primary.hue + 120, this.primary.saturation, this.primary.lightness).toHex()
        ]
    }
}

export class Tetradic extends Scheme {
    constructor(initial: number) {
        super(initial)

        const second = new HSL(this.primary.hue + 45, this.primary.saturation, this.primary.lightness)
        const complement = new HSL(this.primary.hue + 180, this.primary.saturation, this.primary.lightness)
        const secondComplement = new HSL(second.hue + 180, this.primary.saturation, this.primary.lightness)

        this.colors = [
            initial,
            second.toHex(),
            complement.toHex(),
            secondComplement.toHex()
        ]
    }
}

export class Square extends Scheme {
    constructor(initial: number) {
        super(initial)

        const second = new HSL(this.primary.hue + 90, this.primary.saturation, this.primary.lightness)
        const third = new HSL(this.primary.hue + 180, this.primary.saturation, this.primary.lightness)
        const fourth = new HSL(second.hue + 270, this.primary.saturation, this.primary.lightness)

        this.colors = [
            initial,
            second.toHex(),
            third.toHex(),
            fourth.toHex()
        ]
    }
}