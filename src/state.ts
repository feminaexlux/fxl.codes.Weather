import Crack from "./crack"

export default class State {
    readonly canvas: HTMLCanvasElement
    readonly maxCracks: number
    readonly grid: number[][]
    colors: number[]
    seeds: {x: number, y: number}[]
    cracks: Crack[]
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
        context.fillStyle = "rgb(255 255 255 / 95%)"
        context.fillRect(0, 0, width, height)

        for (let x = 0; x < width; x++) {
            this.grid[x] = []

            for (let y = 0; y < height; y++) {
                this.grid[x][y] = 10001
            }
        }

        for (let i = 0; i < 3; i++) {
            const x = Math.floor(Math.random() * width)
            const y = Math.floor(Math.random() * height)
            const angle = Math.floor(Math.random() * 360)
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
        if (!this.seeds.length) {
            const x = Math.floor(Math.random() * this.canvas.width)
            const y = Math.floor(Math.random() * this.canvas.height)
            let angle = this.grid[x][y]

            if (angle > 10000) {
                angle = Math.floor(Math.random() * 360)
                this.grid[x][y] = angle
            }

            return {x, y, angle}
        }

        const randomIndex = Math.floor(Math.random() * this.seeds.length)
        const entry = this.seeds.splice(randomIndex, 1)[0]
        return {
            x: entry.x,
            y: entry.y,
            angle: this.grid[entry.x][entry.y]
        }
    }
}