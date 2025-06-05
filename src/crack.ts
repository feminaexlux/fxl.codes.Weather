import SandPainter from "./sand-painter"
import State from "./state"

export default class Crack {
    private static padding = .66
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