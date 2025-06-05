import State from "./state"

export default class SandPainter {
    private color: number
    private gain: number

    constructor(color: number) {
        this.color = color
        this.gain = Math.random() / 10
    }

    render() {

    }
}