import Crack from "./crack"

export default class State {
    readonly canvas: HTMLCanvasElement
    readonly maxCracks: number
    readonly grid: number[][]
    readonly canvasColors = [
        "rgb(27 27 27 / 90%)",
        "rgb(90 90 90 / 90%)",
        "rgb(126 126 126 / 90%)",
        "rgb(180 180 180 / 90%)",
        "rgb(255 255 255 / 90%)",
        "rgb(180 180 180 / 90%)",
        "rgb(126 126 126 / 90%)",
        "rgb(90 90 90 / 90%)"
    ]
    colors: number[]
    seeds: {x: number, y: number}[]
    cracks: Crack[]
    canvasIndex: number = 0
    colorIndex: number = 0

    constructor(colors: number[], maxCracks: number, canvas: HTMLCanvasElement) {
        this.canvas = canvas
        this.maxCracks = maxCracks
        this.grid = []
        this.colors = colors
        this.cracks = []
        this.seeds = []

        this.init()
    }

    init(colors?: number[]) {
        if (colors) this.colors = colors
        this.cracks.length = 0
        this.grid.length = 0
        this.seeds.length = 0
        this.colorIndex = 0

        const height = this.canvas.height
        const width = this.canvas.width
        const context = this.canvas.getContext("2d")
        context.fillStyle = this.canvasColors[this.canvasIndex++ % this.canvasColors.length]
        context.fillRect(0, 0, width, height)

        for (let x = 0; x < width; x++) {
            this.grid[x] = []

            for (let y = 0; y < height; y++) {
                this.grid[x][y] = 10001
            }
        }

        const random = crypto.getRandomValues(new Uint8Array(9))
        for (let i = 0; i < 9; i += 3) {
            const x = Math.floor(random[i] * width / 256)
            const y = Math.floor(random[i + 1] * height / 256)
            const angle = Math.floor(random[i + 2] * 360 / 256)
            this.cracks.push(new Crack(this, x, y, angle))
            this.grid[x][y] = angle
        }
    }

    addCrack() {
        if (this.cracks.length >= this.maxCracks) return

        const {x, y, angle} = this.getNewEntry()
        this.cracks.push(new Crack(this, x, y, angle))
    }

    getNextColor(): number {
        return this.colors[this.colorIndex++ % this.colors.length]
    }

    isWithinBoundary(x: number, y: number): boolean {
        return x >= 0 && x < this.canvas.width && y >= 0 && y < this.canvas.height
    }

    getNewEntry(): {x: number, y: number, angle: number} {
        const random = crypto.getRandomValues(new Uint8Array(4))
        if (!this.seeds.length) {
            const x = Math.floor(random[0] * this.canvas.width / 256)
            const y = Math.floor(random[1] * this.canvas.height / 256)
            let angle = this.grid[x][y]

            if (angle > 10000) {
                angle = Math.floor(random[2] * 360 / 256)
                this.grid[x][y] = angle
            }

            return {x, y, angle}
        }

        const randomIndex = Math.floor(random[3] * this.seeds.length / 256)
        const entry = this.seeds.splice(randomIndex, 1)[0]
        return {
            x: entry.x,
            y: entry.y,
            angle: this.grid[entry.x][entry.y]
        }
    }
}