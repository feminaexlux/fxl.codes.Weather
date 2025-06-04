// TS attempt of http://www.complexification.net/gallery/machines/substrate/index.php by laniaung.me 2025-06-02
import State from "./state"
import SandPainter from "./sandPainter"

export default class Substrate {
    private state: State

    constructor(id: string, maxCracks: number, colors?: number[]) {
        if (!colors?.length) colors = [ 0x3a1e3e, 0x7c2d3b, 0xb94f3c, 0xf4a462, 0xf9c54e ] // https://colormagic.app/palette/671eeb6c42273fc4c1bb1ac7

        let canvas = document.getElementById(id)
        if (!canvas) {
            canvas = document.createElement("canvas")
            document.body.appendChild(canvas)
        }

        this.state = new State(colors, maxCracks, canvas.clientHeight, canvas.clientWidth)
    }
}

class Crack {
    private x: number = 0
    private y: number = 0
    private angle: number = 0
    private painter: SandPainter
    private state: State

    constructor(state: State) {
        this.painter = new SandPainter(state)
        this.state = state
        this.init()
    }

    init() {
        let x = 0, y = 0, found = false, tries = 0
        while (!found && tries++ < 1000) {
            x = Math.random() * this.state.width
            y = Math.random() * this.state.height
            found = this.state.crackGrid[y * this.state.height + x] < 10000
        }

        if (!found) {
            console.warn("Unable to start crack due to timeout")
            return
        }

        const negative = Math.random() < 0.5
        let value = this.state.crackGrid[y * this.state.height + x]

        if (negative) value -= 90 + Math.floor(Math.random() * 4.1 - 2)
        else value += 90 + Math.floor(Math.random() * 4.1 - 2)
    }

    start(x: number, y: number, angle: number) {
        this.x = x + .61 * Math.cos(angle * Math.PI / 180)
        this.y = y + .61 * Math.sin(angle * Math.PI / 180)
        this.angle = angle
    }

    continue() {
        this.x += .42 * Math.cos(this.angle * Math.PI / 180)
        this.y += .42 * Math.sin(this.angle * Math.PI / 180)
    }
}

declare global {
    interface Window {
        main: Substrate
    }
}

window.main = new Substrate("substrate-canvas", 20)