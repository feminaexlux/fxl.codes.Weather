import Substrate from "./substrate"
import Weather from "./weather"

const ready = (func: () => void) => document.readyState !== "loading" ? func() : document.addEventListener("DOMContentLoaded", func)
ready(() => {
    new Substrate(20)
})

/*
let weather: Weather
navigator.geolocation.getCurrentPosition(position => {
    weather = new Weather(position.coords.latitude, position.coords.longitude)
}, () => {
    weather = new Weather()
})
 */