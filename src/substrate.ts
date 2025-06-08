// TS attempt of http://www.complexification.net/gallery/machines/substrate/index.php by laniaung.me
import State from "./state"
import {Scheme, Analogous, Monochromatic, SplitComplementary, Square, Tetradic, Triadic} from "./color-schemes"

export default class Substrate {
    private readonly state: State

    constructor(maxCracks: number, colors?: number[]) {
        if (!colors?.length) colors = [ 0x3a1e3e, 0x7c2d3b, 0xb94f3c, 0xf4a462, 0xf9c54e ] // https://colormagic.app/palette/671eeb6c42273fc4c1bb1ac7

        const canvas = document.createElement("canvas")
        canvas.width = document.body.clientWidth
        canvas.height = document.body.clientHeight
        document.body.appendChild(canvas)

        this.state = new State(colors, maxCracks, canvas)
        this.init()
    }

    init() {
        const me = this
        const draw = () => {
            for (const crack of me.state.cracks) crack.draw()
            requestAnimationFrame(draw)
        }

        setInterval(() => me.state.init(me.getRandomColorScheme()), 120 * 1000)
        draw()
    }

    getRandomColorScheme(): number[] {
        const color = Math.floor(Math.random() * Math.pow(256, 3))
        let scheme: Scheme
        switch (Math.floor(Math.random() * 6)) {
            case 1:
                scheme = new Monochromatic(color)
                break;
            case 2:
                scheme = new SplitComplementary(color)
                break;
            case 3:
                scheme = new Triadic(color)
                break;
            case 4:
                scheme = new Tetradic(color)
                break;
            case 5:
                scheme = new Square(color)
                break;
            default:
                scheme = new Analogous(color)
        }

        console.info(scheme.toString())
        return scheme.colors
    }
}