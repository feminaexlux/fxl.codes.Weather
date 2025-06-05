import State from "./state"

export default class SandPainter {
    private color: number
    private gain: number
    private readonly boundaryCheck: (x: number, y: number) => boolean

    constructor(color: number, boundaryCheck: (x: number, y: number) => boolean) {
        this.color = color
        this.boundaryCheck = boundaryCheck
        this.gain = Math.random() / 10
    }

    render(x: number, y: number, angle: number) {
        let open = true, paintX: number, paintY: number
        while (open) {
            paintX = x + .81 * Math.sin(angle * Math.PI / 180)
            paintY = y - .81 * Math.cos(angle * Math.PI / 180)

            const gridX = Math.floor(paintX)
            const gridY = Math.floor(paintY)
            if (this.boundaryCheck(gridX, gridY)) {

            }
        }
    }
}