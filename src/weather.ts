import { fetchWeatherApi } from 'openmeteo'

export default class Weather {
    private readonly options: WeatherOptions

    constructor(latitude?: number, longitude?: number) {
        latitude ??= 47.61002138071677
        longitude ??= -122.17906310779568

        this.options = new WeatherOptions()
        this.options = { ...this.options, latitude, longitude }

        this.getWeather(this.options)
    }

    async getWeather(options: WeatherOptions) {
        const url = "https://api.open-meteo.com/v1/forecast"
        const responses = await fetchWeatherApi(url, this.options)

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
    latitude: number
    longitude: number
    daily: string[] = ["temperature_2m_max", "temperature_2m_min", "sunrise", "sunset", "uv_index_max", "precipitation_sum", "precipitation_hours", "wind_speed_10m_max", "wind_gusts_10m_max", "wind_direction_10m_dominant"]
    hourly: string[] = ["temperature_2m", "precipitation", "precipitation_probability"]
    current: string[] = ["temperature_2m", "relative_humidity_2m", "apparent_temperature", "precipitation", "wind_speed_10m", "wind_gusts_10m", "wind_direction_10m"]
    timezone: string = "America/Los_Angeles"
    "wind_speed_unit": string = "mph"
    "temperature_unit": string = "fahrenheit"
    "precipitation_unit": string = "inch"
}