import State from "./state"

export default class SandPainter {
    private color: number
    private gain: number

    constructor(color: number) {
        this.color = color
        this.gain = Math.random() / 10
    }

    render(x: number, y: number, angle: number, state: State) {
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

        const grains = 64
        const hex = this.color.toString(16)
        const w = this.gain / (grains - 1) // some kind of multiplier
        const context = state.canvas.getContext("2d")
        for (let i = 0; i < grains; i++) {
            const alpha = (.1 - i / (grains * 10)) * 255
            context.fillStyle = `#${hex.padStart(6, "0")}${alpha.toString(16).padStart(2, "0")}`

        }
    }
}