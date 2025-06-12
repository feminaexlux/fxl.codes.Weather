import { fetchWeatherApi } from 'openmeteo'

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
        setInterval(() => me.fetchWeather().then(() => me.setDisplay()), 60 * 1000)
        me.fetchWeather().then(() => me.setDisplay())
    }

    async fetchWeather(): Promise<void> {
        const me = this
        const parameters: any = { ...me.options }
        let getData = false

        if (!me.lastFetched) {
            parameters["daily"] = me.dailyVariables
            parameters["hourly"] = me.hourlyVariables
            parameters["current"] = me.currentVariables
            me.lastFetched = new LastFetched()
            getData = true
        } else {
            // Reasonable-ish timers?
            if (me.lastFetched.minutesSinceCurrent() > 15) {
                parameters["current"] = me.currentVariables
                me.lastFetched.current = new Date()
                getData = true
            }

            if (me.lastFetched.hoursSinceHourly() > 3) {
                parameters["hourly"] = me.hourlyVariables
                me.lastFetched.hourly = new Date()
                getData = true
            }

            if (me.lastFetched.hoursSinceDaily() > 8) {
                parameters["daily"] = me.dailyVariables
                me.lastFetched.daily = new Date()
                getData = true
            }
        }

        if (!getData) return

        const responses = await fetchWeatherApi(me.apiUrl, parameters)
        for (const response of responses) {
            const utcOffsetSeconds = response.utcOffsetSeconds()
            const current = response.current()
            const hourly = response.hourly()
            const daily = response.daily()

            if (current != null) {
                me.current = {
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

            if (hourly != null) {
                const length = Number(hourly.timeEnd() - hourly.time()) / hourly.interval()
                const temperatures = hourly.variables(0)!.valuesArray()
                const precipitationTotals = hourly.variables(1)!.valuesArray()
                const precipitationProbabilities = hourly.variables(2)!.valuesArray()
                me.hourly.length = 0

                for (let i = 0; i < length; i++) {
                    me.hourly.push({
                        time: new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000),
                        temperature: temperatures[i],
                        precipitation: precipitationTotals[i],
                        precipitationProbability: precipitationProbabilities[i]
                    })
                }
            }

            if (daily != null) {
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

                me.daily.length = 0

                for (let i = 0; i < length; i++) {
                    me.daily.push({
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
        }
    }

    private setDisplay() {
        let panel = document.getElementById("weather-panel")
        if (!panel) {
            panel = document.createElement("main")
            panel.id = "weather-panel"
            document.body.appendChild(panel)
        }

        while (panel.firstChild) panel.removeChild(panel.firstChild)

        const currentSection = document.createElement("section")
        currentSection.id = "current-section"
        panel.appendChild(currentSection)
        this.setDisplayCurrent(currentSection)
    }

    private setDisplayCurrent(section: HTMLElement) {
        const header = document.createElement("header")
        header.textContent = "Current"

        section.appendChild(header)

        const list = document.createElement("dl")
        for (let key of Object.keys(this.current)) {
            const term = document.createElement("dt")
            term.textContent = key

            const value = document.createElement("dd")
            value.textContent = (this.current as any)[key]

            list.append(term, value)
        }

        section.appendChild(list)
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

    minutesSinceCurrent(): number {
        return (new Date().getTime() - this.current.getTime()) / 60000
    }

    hoursSinceHourly(): number {
        return (new Date().getTime() - this.hourly.getTime()) / 3600000
    }

    hoursSinceDaily(): number {
        return (new Date().getTime() - this.daily.getTime()) / 3600000
    }
}