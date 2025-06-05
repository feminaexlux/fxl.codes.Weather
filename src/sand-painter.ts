import State from "./state"

export default class SandPainter {
    private color: number
    private gain: number

    constructor(state: State) {
        this.color = state.getRandomColor()
        this.gain = Math.random() / 10
    }
}