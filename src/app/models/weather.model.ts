export interface WeatherModel {
  base: string
  clouds: Clouds
  cod: number
  coord: Coord
  main: Main
  rain: Rain
  dt: number
  id: number
  name: string
  sys: Sys
  timezone: number
  visibility: number
  weather: Weather[]
  wind: Wind
}

export interface Coord {
  lat: number
  lon: number
}

export interface Weather {
  icon: string
  id: number
  description: string
  main: string
}

export interface Main {
  feels_like: number
  grnd_level: number
  humidity: number
  pressure: number
  temp: number
  sea_level: number
  temp_max: number
  temp_min: number
}

export interface Rain {
  '1h': number
  '3h': number
}

export interface Wind {
  deg: number
  gust: number
  speed: number
}

export interface Clouds {
  all: number
}

export interface Sys {
  id: number
  country: string
  sunrise: number
  sunset: number
  type: number
}
