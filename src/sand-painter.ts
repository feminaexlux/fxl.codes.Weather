import Crack from "./crack"

export default class SandPainter {
    private crack: Crack
    private color: number
    private gain: number

    constructor(crack: Crack) {
        this.crack = crack
        this.color = this.crack.state.getRandomColor()
        this.gain = Math.random() / 10
    }

    render() {
        const state = this.crack.state, x = this.crack.x, y = this.crack.y, angle = this.crack.angle
        let open = true, endX = x, endY = y

        while (open) {
            endX += .81 * Math.sin(angle * Math.PI / 180)
            endY -= .81 * Math.cos(angle * Math.PI / 180)

            const gridX = Math.floor(endX)
            const gridY = Math.floor(endY)
            if (state.isWithinBoundary(gridX, gridY)) {
                open = state.grid[gridX][gridY] > 10000
            } else {
                open = false
            }
        }

        this.gain += (Math.random() / 10 - .05)
        if (this.gain < 0) this.gain = 0
        if (this.gain > 1) this.gain = 1

        const grains = 64
        const hex = this.color.toString(16)
        const w = this.gain / (grains - 1) // some kind of multiplier
        const context = state.canvas.getContext("2d")
        for (let i = 0; i < grains; i++) {
            const alpha = Math.floor((.1 - i / (grains * 10)) * 255)
            const paintX = x + (endX - x) * Math.sin(Math.sin(i * w))
            const paintY = y + (endY - y) * Math.sin(Math.sin(i * w))
            context.fillStyle = `#${hex.padStart(6, "0")}${alpha.toString(16).padStart(2, "0")}`
            context.fillRect(paintX, paintY, 1, 1)
        }
    }
}