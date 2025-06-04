export default class State {
    colors: number[]
    maxCracks: number
    crackGrid: number[]
    height: number
    width: number

    constructor(colors: number[], maxCracks: number, height: number, width: number) {
        this.colors = colors
        this.maxCracks = maxCracks
        this.height = height
        this.width = width
        this.crackGrid = []

        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                this.crackGrid[y * width + x] = 10000
            }
        }

        for (let i = 0; i < 16; i++) {
            this.crackGrid[Math.floor(Math.random() * (height * width))] = Math.ceil(Math.random() * 360)
        }
    }

    getRandomColor(): number {
        return this.colors[Math.floor(Math.random() * this.colors.length)]
    }
}