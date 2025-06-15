import { fetchWeatherApi } from "openmeteo"
import { VariablesWithTime } from "@openmeteo/sdk/variables-with-time"

export default class Weather {
    private readonly apiUrl = "https://api.open-meteo.com/v1/forecast"
    private readonly options: WeatherOptions
    private readonly dailyVariables = ["temperature_2m_max", "temperature_2m_min", "sunrise", "sunset", "uv_index_max", "precipitation_sum", "precipitation_hours", "wind_speed_10m_max", "wind_gusts_10m_max", "wind_direction_10m_dominant"]
    private readonly hourlyVariables = ["temperature_2m", "precipitation", "precipitation_probability"]
    private readonly currentVariables = ["temperature_2m", "relative_humidity_2m", "apparent_temperature", "precipitation", "wind_speed_10m", "wind_gusts_10m", "wind_direction_10m", "cloud_cover"]
    private lastFetched: LastFetched
    current: CurrentWeather
    hourly: HourlyWeather[] = []
    daily: DailyWeather[] = []

    constructor(latitude?: number, longitude?: number) {
        this.options = new WeatherOptions(latitude ?? 47.61002138071677, longitude ?? -122.17906310779568)

        const time = document.getElementById("time")
        time.textContent = new Date().toLocaleTimeString("en-US", { hour12: false, timeStyle: "short" })
        setInterval(() => time.textContent = new Date().toLocaleTimeString("en-US", { hour12: false, timeStyle: "short" }), 15000)

        const me = this
        setInterval(() => me.fetchWeather().then(() => me.setDisplay()), 300000)
        me.fetchWeather().then(() => me.setDisplay())
    }

    async fetchWeather(): Promise<void> {
        const me = this
        const parameters: any = { ...me.options }
        if (!me.doFetchData(parameters)) return

        const responses = await fetchWeatherApi(me.apiUrl, parameters)
        for (const response of responses) {
            const current = response.current()
            const hourly = response.hourly()
            const daily = response.daily()

            if (current != null) me.setCurrentData(current)
            if (hourly != null) me.setHourlyData(hourly)
            if (daily != null) me.setDailyData(daily)
        }
    }

    private doFetchData(parameters: any): boolean {
        const me = this
        if (!me.lastFetched) {
            parameters["daily"] = me.dailyVariables
            parameters["hourly"] = me.hourlyVariables
            parameters["current"] = me.currentVariables
            me.lastFetched = new LastFetched()
            return true
        } else {
            // Weather data is updated :00, :15, :30, :45 so wait at least a minute
            if (me.lastFetched.current.getMinutes() % 15 >= 1 && me.lastFetched.current.getMinutes() % 15 < 6) {
                const now = new Date()
                // Make sure data is over 5 minutes old at least
                if ((now.getTime() - me.lastFetched.current.getTime()) > 300000) {
                    parameters["current"] = me.currentVariables
                    me.lastFetched.current = new Date()
                    return true
                }
            }

            // Reasonable-ish timers?
            if (me.lastFetched.hoursSinceHourly() > 3) {
                parameters["hourly"] = me.hourlyVariables
                me.lastFetched.hourly = new Date()
                return true
            }

            if (me.lastFetched.hoursSinceDaily() > 8) {
                parameters["daily"] = me.dailyVariables
                me.lastFetched.daily = new Date()
                return true
            }
        }

        return false
    }

    private setCurrentData(current: VariablesWithTime) {
        this.current = {
            time: new Date(Number(current.time()) * 1000),
            temperature: current.variables(0)!.value(),
            humidity: current.variables(1)!.value(),
            feelsLike: current.variables(2)!.value(),
            precipitation: current.variables(3)!.value(),
            windSpeed: current.variables(4)!.value(),
            windGusts: current.variables(5)!.value(),
            windDirection: current.variables(6)!.value(),
            cloudCoverage: current.variables(7)!.value()
        }
    }

    private setHourlyData(hourly: VariablesWithTime) {
        const length = Number(hourly.timeEnd() - hourly.time()) / hourly.interval()
        const temperatures = hourly.variables(0)!.valuesArray()
        const precipitationTotals = hourly.variables(1)!.valuesArray()
        const precipitationProbabilities = hourly.variables(2)!.valuesArray()
        this.hourly.length = 0

        for (let i = 0; i < length; i++) {
            this.hourly.push({
                time: new Date((Number(hourly.time()) + i * hourly.interval()) * 1000),
                temperature: temperatures[i],
                precipitation: precipitationTotals[i],
                precipitationProbability: precipitationProbabilities[i]
            })
        }
    }

    private setDailyData(daily: VariablesWithTime) {
        const length = Number(daily.timeEnd() - daily.time()) / daily.interval()
        const maxTemperatures = daily.variables(0)!.valuesArray()
        const minTemperatures = daily.variables(1)!.valuesArray()
        const sunrise = daily.variables(2)
        const sunset = daily.variables(3)
        const maxUVs = daily.variables(4)!.valuesArray()
        const precipitationTotals = daily.variables(5)!.valuesArray()
        const precipitationHours = daily.variables(6)!.valuesArray()
        const maxWindSpeeds = daily.variables(7)!.valuesArray()
        const maxWindGusts = daily.variables(8)!.valuesArray()
        const prominentWindDirections = daily.variables(9)!.valuesArray()

        this.daily.length = 0

        for (let i = 0; i < length; i++) {
            this.daily.push({
                time: new Date((Number(daily.time()) + i * daily.interval()) * 1000),
                maxTemperature: maxTemperatures[i],
                minTemperature: minTemperatures[i],
                sunrise: new Date((Number(sunrise.valuesInt64(i))) * 1000),
                sunset: new Date((Number(sunset.valuesInt64(i))) * 1000),
                maxUV: maxUVs[i],
                totalPrecipitation: precipitationTotals[i],
                hoursOfPrecipitation: precipitationHours[i],
                maxWindSpeed: maxWindSpeeds[i],
                maxWindGusts: maxWindGusts[i],
                prominentWindDirection: prominentWindDirections[i]
            })
        }
    }

    private setDisplay() {
        const current = document.getElementById("current")
        current.innerHTML = `<header title="Temperature (feels like)"><span class="material">thermostat</span>${Math.round(this.current.temperature)} (${Math.round(this.current.feelsLike)})</header>
<main>
    <div><span class="material">water_drop</span> ${Math.round(this.current.humidity)}%</div>
    <div><span class="material">cloud</span> ${Math.round(this.current.cloudCoverage)}%</div>
    <div><span class="material">weather_mix</span> ${Math.round(this.current.precipitation)}%</div>
    <div><span class="material">air</span> ${Math.round(this.current.windSpeed)} (${Math.round(this.current.windGusts)}) ${this.inCardinals(this.current.windDirection)}</div>
</main>`
    }

    private inCardinals(direction: number): string {
        if (direction > 337.5 || direction <= 22.5) return "N"
        if (direction > 22.5 || direction <= 67.5) return "NE"
        if (direction > 67.5 || direction <= 112.5) return "E"
        if (direction > 112.5 || direction <= 157.5) return "SE"
        if (direction > 157.5 || direction <= 202.5) return "S"
        if (direction > 202.5 || direction <= 249.5) return "SW"
        if (direction > 249.5 || direction <= 294.5) return "W"
        if (direction > 294.5 || direction <= 337.5) return "NW"
        return null
    }
}

class WeatherOptions {
    readonly latitude: number
    readonly longitude: number
    readonly timezone: string = "America/Los_Angeles"
    "wind_speed_unit" = "mph"
    "temperature_unit" = "fahrenheit"
    "precipitation_unit" = "inch"

    constructor(latitude: number, longitude: number, timezone = "America/Los_Angeles") {
        this.latitude = latitude
        this.longitude = longitude
        this.timezone = timezone
    }
}

interface CurrentWeather {
    time: Date
    temperature: number
    humidity: number
    feelsLike: number
    precipitation: number
    windSpeed: number
    windGusts: number
    windDirection: number
    cloudCoverage: number
}

interface DailyWeather {
    time: Date
    hoursOfPrecipitation: number
    totalPrecipitation: number
    sunrise: Date
    sunset: Date
    maxTemperature: number
    minTemperature: number
    maxUV: number
    prominentWindDirection: number
    maxWindGusts: number
    maxWindSpeed: number
}

interface HourlyWeather {
    time: Date
    precipitation: number
    precipitationProbability: number
    temperature: number
}

class LastFetched {
    current: Date = new Date()
    hourly: Date = new Date()
    daily: Date = new Date()

    hoursSinceHourly(): number {
        return (new Date().getTime() - this.hourly.getTime()) / 3600000
    }

    hoursSinceDaily(): number {
        return (new Date().getTime() - this.daily.getTime()) / 3600000
    }
}