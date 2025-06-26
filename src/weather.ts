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

        const me = this
        const time = document.getElementById("time-value")
        time.textContent = new Date().toLocaleTimeString("en-US", { hour12: false, timeStyle: "short" })
        setInterval(() => time.textContent = new Date().toLocaleTimeString("en-US", { hour12: false, timeStyle: "short" }), 15000)

        setInterval(() => me.fetchWeather().then(() => me.setDisplay()), 300000)
        me.fetchWeather().then(() => me.setDisplay())
    }

    async fetchWeather(): Promise<void> {
        const me = this
        const parameters: any = { ...me.options }
        const needsUpdate = me.needsUpdate(parameters)
        if (!needsUpdate) return

        console.info("Getting weather", parameters)
        const responses = await fetchWeatherApi(me.apiUrl, parameters)
        for (const response of responses) {
            const current = response.current()
            const hourly = response.hourly()
            const daily = response.daily()

            if (current != null) me.current = new CurrentWeather(current)
            if (hourly != null) me.setHourlyData(hourly)
            if (daily != null) me.setDailyData(daily)
        }
    }

    private needsUpdate(parameters: any): boolean {
        const me = this
        if (!me.lastFetched) {
            parameters["daily"] = me.dailyVariables
            parameters["hourly"] = me.hourlyVariables
            parameters["current"] = me.currentVariables
            me.lastFetched = new LastFetched()
            return true
        } else {
            // Weather data is updated every 15 minutes starting at :00 but just wait 15 minutes for an update
            if (me.lastFetched.minutesSinceCurrent() >= 15) {
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

    private setHourlyData(hourly: VariablesWithTime) {
        const length = Number(hourly.timeEnd() - hourly.time()) / hourly.interval()
        const temperatures = hourly.variables(0)!.valuesArray()
        const precipitationTotals = hourly.variables(1)!.valuesArray()
        const precipitationProbabilities = hourly.variables(2)!.valuesArray()
        this.hourly.length = 0

        for (let i = 0; i < length; i++) {
            this.hourly.push({
                time: new Date(new Date().getTime() + i * 3600000),
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
            const weather = new DailyWeather()
            weather.time = new Date((Number(daily.time()) + i * daily.interval()) * 1000)
            weather.maxTemperature = maxTemperatures[i]
            weather.minTemperature = minTemperatures[i]
            weather.sunrise = new Date((Number(sunrise.valuesInt64(i))) * 1000)
            weather.sunset = new Date((Number(sunset.valuesInt64(i))) * 1000)
            weather.maxUV = maxUVs[i]
            weather.totalPrecipitation = precipitationTotals[i]
            weather.hoursOfPrecipitation = precipitationHours[i]
            weather.maxWindSpeed = maxWindSpeeds[i]
            weather.maxWindGusts = maxWindGusts[i]
            weather.prominentWindDirection = prominentWindDirections[i]

            this.daily.push(weather)
        }
    }

    private setDisplay() {
        console.debug(this)
        const current = document.getElementById("current")
        current.innerHTML = `<div><span class="material">thermostat</span>${Math.round(this.current.temperature)} (${Math.round(this.current.feelsLike)})</div>
<div><span class="material">humidity_percentage</span> ${Math.round(this.current.humidity)}%</div>
<div><span class="material">cloud</span> ${Math.round(this.current.cloudCoverage)}%</div>
<div><span class="material">weather_mix</span> ${Math.round(this.current.precipitation)}%</div>
<div><span class="material">air</span> ${Math.round(this.current.windSpeed)} (${Math.round(this.current.windGusts)}) ${this.inCardinals(this.current.windDirection)}</div>`
        if (!this.daily) return

        const icon = document.getElementById("time-icon")
        icon.innerText = this.current.getCloudCoverageIcon(this.daily[0].sunrise, this.daily[0].sunset)

        const dailySlots: string[] = []
        for (const day of this.daily) {
            dailySlots.push(`<div class="daily-slot">
    <span class="date">${day.time.getDate()}</span>
    <span class="range">${Math.round(day.minTemperature)} - ${Math.round(day.maxTemperature)}</span>
    <span class="uv ${day.uvRating()}">${Math.round(day.maxUV)}</span>
    <span class="sunrise">${day.sunrise.toLocaleTimeString("en-US", { timeStyle: "short", hour12: false })}</span>
    <span class="sunset">${day.sunset.toLocaleTimeString("en-US", { timeStyle: "short", hour12: false })}</span>
</div>`)
        }

        const daily = document.getElementById("daily")
        daily.innerHTML = dailySlots.join("\r\n")

        if (!this.hourly) return

        const hourlySlots: string[] = []
        for (let i = 0; i < 12; i++) {
            const hour = this.hourly[i]
            hourlySlots.push(`<div class="hourly-slot">
    <span class="hour">${hour.time.getHours()}</span>
    <span class="temp">${Math.round(hour.temperature)}</span>
    <span class="precipitation">${hour.precipitation}<sup>"</sup></span>
    <span class="chance">${hour.precipitationProbability}<sup>%</sup></span>
</div>`)
        }

        const hourly = document.getElementById("hourly")
        hourly.innerHTML = hourlySlots.join("\r\n")
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
    "forecast_hours": 12

    constructor(latitude: number, longitude: number, timezone = "America/Los_Angeles") {
        this.latitude = latitude
        this.longitude = longitude
        this.timezone = timezone
    }
}

class CurrentWeather {
    time: Date
    temperature: number
    humidity: number
    feelsLike: number
    precipitation: number
    windSpeed: number
    windGusts: number
    windDirection: number
    cloudCoverage: number

    constructor(current: VariablesWithTime) {
        this.time = new Date(Number(current.time()) * 1000)
        this.temperature = current.variables(0)!.value()
        this.humidity = current.variables(1)!.value()
        this.feelsLike = current.variables(2)!.value()
        this.precipitation = current.variables(3)!.value()
        this.windSpeed = current.variables(4)!.value()
        this.windGusts = current.variables(5)!.value()
        this.windDirection = current.variables(6)!.value()
        this.cloudCoverage = current.variables(7)!.value()
    }

    getCloudCoverageIcon(sunrise?: Date, sunset?: Date): string {
        if (this.cloudCoverage > 75 || !sunrise || !sunset) return "cloud"

        if (this.time.getTime() > sunrise.getTime() && this.time.getTime() < sunset.getTime())
            return this.cloudCoverage > 25 ? "partly_cloudy_day" : "clear_day"

        return this.cloudCoverage > 25 ? "partly_cloudy_night" : "bedtime"
    }
}

class DailyWeather {
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

    uvRating(): string {
        if (this.maxUV < 3) return "low"
        if (this.maxUV < 6) return "moderate"
        if (this.maxUV < 8) return "high"
        if (this.maxUV < 11) return "very-high"
        return "extreme"
    }
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

    minutesSinceCurrent(): number {
        return Math.floor((new Date().getTime() - this.current.getTime()) / 60000)
    }

    hoursSinceHourly(): number {
        return Math.floor((new Date().getTime() - this.hourly.getTime()) / 3600000)
    }

    hoursSinceDaily(): number {
        return Math.floor((new Date().getTime() - this.daily.getTime()) / 3600000)
    }
}