import Crack from "./crack"

export default class State {
    readonly canvas: HTMLCanvasElement
    readonly colors: number[]
    readonly maxCracks: number
    readonly grid: number[][]
    seeds: {x: number, y: number}[]
    cracks: Crack[]

    constructor(colors: number[], maxCracks: number, canvas: HTMLCanvasElement) {
        this.canvas = canvas
        this.colors = colors
        this.maxCracks = maxCracks
        this.grid = []
        this.cracks = []

        this.init()
    }

    init() {
        this.seeds = []
        const height = this.canvas.height
        const width = this.canvas.width
        const context = this.canvas.getContext("2d")
        context.fillStyle = "rgb(255 255 255 / 95%)"
        context.fillRect(0, 0, width, height)

        for (let x = 0; x < width; x++) {
            if (!this.grid[x]) this.grid[x] = []

            for (let y = 0; y < height; y++) {
                this.grid[x][y] = 10001
            }
        }

        for (let i = 0; i < 16; i++) {
            const x = Math.floor(Math.random() * width)
            const y = Math.floor(Math.random() * height)
            this.grid[x][y] = Math.floor(Math.random() * 360)
            this.seeds.push({x, y})
        }

        this.cracks = [new Crack(this), new Crack(this), new Crack(this)]
    }

    addCrack() {
        if (this.cracks.length < this.maxCracks) this.cracks.push(new Crack(this))
    }

    getRandomColor(): number {
        return this.colors[Math.floor(Math.random() * this.colors.length)]
    }
}