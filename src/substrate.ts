// TS attempt of http://www.complexification.net/gallery/machines/substrate/index.php by laniaung.me 2025-06-02
export default class Substrate {
    private colors = [ 0x3a1e3e, 0x7c2d3b, 0xb94f3c, 0xf4a462, 0xf9c54e ] // https://colormagic.app/palette/671eeb6c42273fc4c1bb1ac7
    private maxCracks = 20

    constructor(maxCracks: number) {
        this.maxCracks = maxCracks
    }
}

class State {
    crackGrid: number[]
    height: number
    width: number

    constructor(height: number, width: number) {
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
}

class SandPainter {
}

class Crack {
    private x: number = 0
    private y: number = 0
    private angle: number = 0
    private painter: SandPainter
    private state: State

    constructor(state: State) {
        this.painter = new SandPainter()
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

    }
}