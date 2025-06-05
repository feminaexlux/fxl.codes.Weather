// TS attempt of http://www.complexification.net/gallery/machines/substrate/index.php by laniaung.me
import State from "./state"

export default class Substrate {
    private readonly canvas: HTMLCanvasElement
    private readonly state: State

    constructor(id: string, maxCracks: number, colors?: number[]) {
        if (!colors?.length) colors = [ 0x3a1e3e, 0x7c2d3b, 0xb94f3c, 0xf4a462, 0xf9c54e ] // https://colormagic.app/palette/671eeb6c42273fc4c1bb1ac7

        let canvas = document.getElementById(id) as HTMLCanvasElement
        if (!canvas) {
            canvas = document.createElement("canvas")
            document.body.appendChild(canvas)
        }

        this.canvas = canvas
        this.state = new State(colors, maxCracks, canvas.clientHeight, canvas.clientWidth)

        this.init()
    }

    init() {
        const context = this.canvas.getContext("2d")
        context.fillStyle = "#fff"
        context.fillRect(0, 0, this.canvas.width, this.canvas.height)
    }
}