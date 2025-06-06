import SandPainter from "./sand-painter"
import State from "./state"

export default class Crack {
    private x: number = 0
    private y: number = 0
    private angle: number = 0
    private painter: SandPainter
    private state: State

    constructor(state: State, x: number, y: number, angle: number) {
        this.painter = new SandPainter(state.getRandomColor())
        this.state = state
        this.start(x, y, angle)
    }

    start(x: number, y: number, angle: number) {
        this.x = x + .61 * Math.cos(angle * Math.PI / 180)
        this.y = y + .61 * Math.sin(angle * Math.PI / 180)
        const flip = Math.random() < 0.5
        this.angle = angle + (90 + Math.floor(Math.random() * 4.1 - 2)) * (flip ? -1 : 1)
    }

    draw() {
        this.x += .42 * Math.cos(this.angle * Math.PI / 180)
        this.y += .42 * Math.sin(this.angle * Math.PI / 180)

        const context = this.state.canvas.getContext("2d")
        context.fillStyle = "#000"
        context.fillRect(this.x, this.y, 1, 1)

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