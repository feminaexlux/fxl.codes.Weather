import { fetchWeatherApi } from 'openmeteo'

export default class Weather {
    private readonly apiUrl = "https://api.open-meteo.com/v1/forecast"
    private readonly options: WeatherOptions
    private readonly dailyVariables = ["temperature_2m_max", "temperature_2m_min", "sunrise", "sunset", "uv_index_max", "precipitation_sum", "precipitation_hours", "wind_speed_10m_max", "wind_gusts_10m_max", "wind_direction_10m_dominant"]
    private readonly hourlyVariables = ["temperature_2m", "precipitation", "precipitation_probability"]
    private readonly currentVariables = ["temperature_2m", "relative_humidity_2m", "apparent_temperature", "precipitation", "wind_speed_10m", "wind_gusts_10m", "wind_direction_10m"]
    private lastFetched: LastFetched
    current: CurrentWeather
    hourly: HourlyWeather[] = []
    daily: DailyWeather[] = []

    constructor(latitude?: number, longitude?: number) {
        this.options = new WeatherOptions(latitude ?? 47.61002138071677, longitude ?? -122.17906310779568)

        const me = this
        me.getWeather().then(() => {
        })
    }

    async getWeather(): Promise<void> {
        const me = this
        const parameters: any = { ...me.options }

        if (!me.lastFetched) {
            parameters["daily"] = me.dailyVariables
            parameters["hourly"] = me.hourlyVariables
            parameters["current"] = me.currentVariables
            me.lastFetched = new LastFetched()
        } else {
            // Reasonable-ish timers?
            if (me.lastFetched.minutesSinceCurrent() > 15) {
                parameters["current"] = me.currentVariables
                me.lastFetched.current = new Date()
            }

            if (me.lastFetched.hoursSinceHourly() > 3) {
                parameters["hourly"] = me.hourlyVariables
                me.lastFetched.hourly = new Date()
            }

            if (me.lastFetched.hoursSinceDaily() > 8) {
                parameters["daily"] = me.dailyVariables
                me.lastFetched.daily = new Date()
            }
        }

        const responses = await fetchWeatherApi(me.apiUrl, parameters)

        for (const response of responses) {
            // Attributes for timezone and location
            const utcOffsetSeconds = response.utcOffsetSeconds()
            const timezone = response.timezone()
            const timezoneAbbreviation = response.timezoneAbbreviation()
            const latitude = response.latitude()
            const longitude = response.longitude()

            const current = response.current()!
            const hourly = response.hourly()!
            const daily = response.daily()!

            const sunrise = daily.variables(2)!
            const sunset = daily.variables(3)!

            // Note: The order of weather variables in the URL query and the indices below need to match!
            const weatherData = {
                current: {
                    time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
                    temperature2m: current.variables(0)!.value(),
                    relativeHumidity2m: current.variables(1)!.value(),
                    apparentTemperature: current.variables(2)!.value(),
                    precipitation: current.variables(3)!.value(),
                    windSpeed10m: current.variables(4)!.value(),
                    windGusts10m: current.variables(5)!.value(),
                    windDirection10m: current.variables(6)!.value(),
                },
                hourly: {
                    time: [...Array((Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval())].map(
                        (_, i) => new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000)
                    ),
                    temperature2m: hourly.variables(0)!.valuesArray()!,
                    precipitation: hourly.variables(1)!.valuesArray()!,
                    precipitationProbability: hourly.variables(2)!.valuesArray()!,
                },
                daily: {
                    time: [...Array((Number(daily.timeEnd()) - Number(daily.time())) / daily.interval())].map(
                        (_, i) => new Date((Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) * 1000)
                    ),
                    temperature2mMax: daily.variables(0)!.valuesArray()!,
                    temperature2mMin: daily.variables(1)!.valuesArray()!,
                    sunrise: [...Array(sunrise.valuesInt64Length())].map(
                        (_, i) => new Date((Number(sunrise.valuesInt64(i)) + utcOffsetSeconds) * 1000)
                    ),
                    sunset: [...Array(sunset.valuesInt64Length())].map(
                        (_, i) => new Date((Number(sunset.valuesInt64(i)) + utcOffsetSeconds) * 1000)
                    ),
                    uvIndexMax: daily.variables(4)!.valuesArray()!,
                    precipitationSum: daily.variables(5)!.valuesArray()!,
                    precipitationHours: daily.variables(6)!.valuesArray()!,
                    windSpeed10mMax: daily.variables(7)!.valuesArray()!,
                    windGusts10mMax: daily.variables(8)!.valuesArray()!,
                    windDirection10mDominant: daily.variables(9)!.valuesArray()!,
                },
            }

            console.log(weatherData)

            // `weatherData` now contains a simple structure with arrays for datetime and weather data
            for (let i = 0; i < weatherData.hourly.time.length; i++) {
                console.log(
                    weatherData.hourly.time[i].toISOString(),
                    weatherData.hourly.temperature2m[i],
                    weatherData.hourly.precipitation[i],
                    weatherData.hourly.precipitationProbability[i]
                )
            }
            for (let i = 0; i < weatherData.daily.time.length; i++) {
                console.log(
                    weatherData.daily.time[i].toISOString(),
                    weatherData.daily.temperature2mMax[i],
                    weatherData.daily.temperature2mMin[i],
                    weatherData.daily.sunrise[i].toISOString(),
                    weatherData.daily.sunset[i].toISOString(),
                    weatherData.daily.uvIndexMax[i],
                    weatherData.daily.precipitationSum[i],
                    weatherData.daily.precipitationHours[i],
                    weatherData.daily.windSpeed10mMax[i],
                    weatherData.daily.windGusts10mMax[i],
                    weatherData.daily.windDirection10mDominant[i]
                )
            }
        }
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

class CurrentWeather {
    time: Date
    temperature: number
    humidity: number
    feelsLike: number
    precipitation: number
    windSpeed: number
    windGusts: number
    windDirection: number
}

class DailyWeather {
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
    asOf: Date
}

class HourlyWeather {
    time: Date
    precipitation: number
    precipitationProbability: number
    temperature: number
}

class LastFetched {
    current: Date
    hourly: Date
    daily: Date

    constructor() {
        const now = new Date()
        this.current = now
        this.hourly = now
        this.daily = now
    }

    minutesSinceCurrent(): number {
        return 0
    }

    hoursSinceHourly(): number {
        return 0
    }

    hoursSinceDaily(): number {
        return 0
    }
}