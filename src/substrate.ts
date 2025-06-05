// TS attempt of http://www.complexification.net/gallery/machines/substrate/index.php by laniaung.me
import State from "./state"

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
        let request: number
        const draw = () => {
            for (const crack of me.state.cracks) crack.draw()
            request = requestAnimationFrame(draw)
        }

        setInterval(() => {
            cancelAnimationFrame(request)
            me.state.init()
            request = requestAnimationFrame(draw)
        }, 60 * 1000)

        request = requestAnimationFrame(draw)
    }
}