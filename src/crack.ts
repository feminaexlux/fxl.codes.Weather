import SandPainter from "./sand-painter"
import State from "./state"

export default class Crack {
    x: number = 0
    y: number = 0
    angle: number = 0
    readonly state: State
    private painter: SandPainter

    constructor(state: State, x: number, y: number, angle: number) {
        this.state = state
        this.painter = new SandPainter(this)
        this.start(x, y, angle)
    }

    start(x: number, y: number, angle: number) {
        const random = crypto.getRandomValues(new Uint8Array(2))
        this.x = x + .61 * Math.cos(angle * Math.PI / 180)
        this.y = y + .61 * Math.sin(angle * Math.PI / 180)
        const flip = (random[0] / 256) > 0.5
        this.angle = angle + (90 + Math.floor((random[1] / 256) * 4.1 - 2)) * (flip ? -1 : 1)
    }

    draw() {
        const random = crypto.getRandomValues(new Uint8Array(2))
        this.x += .42 * Math.cos(this.angle * Math.PI / 180)
        this.y += .42 * Math.sin(this.angle * Math.PI / 180)

        const fuzzX = this.x + (random[0] / 256 * .66 - .33)
        const fuzzY = this.y + (random[1] / 256 * .66 - .33)

        const context = this.state.canvas.getContext("2d")
        context.fillStyle = "#000"
        context.fillRect(fuzzX, fuzzY, 1, 1)
        this.painter.render()

        const x = Math.floor(this.x)
        const y = Math.floor(this.y)
        if (this.state.isWithinBoundary(x, y)) {
            const angle = this.state.grid[x][y]
            if (angle > 10000) {
                this.state.grid[x][y] = Math.floor(this.angle)
                this.state.seeds.push({x, y})
            } else if (this.state.grid[x][y] != Math.floor(this.angle)) {
                const entry = this.state.getNewEntry()
                this.start(entry.x, entry.y, entry.angle)
            }
        } else {
            const entry = this.state.getNewEntry()
            this.start(entry.x, entry.y, entry.angle)
            this.state.addCrack()
        }
    }
}