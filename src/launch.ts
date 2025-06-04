import Substrate from "./substrate"
import Weather from "./weather";

const background = new Substrate("substrate-canvas", 20)
let weather: Weather
navigator.geolocation.getCurrentPosition(position => {
    weather = new Weather(position.coords.latitude, position.coords.longitude)
}, () => {
    weather = new Weather()
})