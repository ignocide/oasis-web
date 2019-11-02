
enum WeatherEN {
  THUNDERSTORM = 'Thunderstorm',
  DRIZZLE = 'Drizzle',
  RAIN = 'Rain',
  SNOW = 'Snow',
  CLEAR = 'Clear',
  CLOUDS = 'Clouds'
}

interface IWeatherInfo {
  weather: string,
  weatherType: WeatherEN,
  time: string,
  visibility: string,
  sunrise: string,
  sunset: string,
  measureLocation: string,
  temp: {
    current: string,
    min: string,
    max: string
  },
  pressure: string,
  wind: string
}


class WeatherInfo {
  weather: string;
  weatherType: WeatherEN;
  time: Date;
  visibility: string;
  sunrise: Date;
  sunset: Date;
  measureLocation: string;
  temp: {
    current: string
    min: string
    max: string
  };
  pressure: string;
  wind: string;

  constructor(info: IWeatherInfo | any = {}) {

    this.weather = info.weather || null;
    this.weatherType = info.weatherType || null;
    this.time = info.time ? new Date(info.time) : null;
    this.visibility = info.visibility || null;
    this.sunrise = info.sunrise ? new Date(info.sunrise) : null;
    this.sunset = info.sunset ? new Date(info.sunset) : null;
    this.measureLocation = info.measureLocation || null;
    this.temp = info.temp || {
      current: '-',
      min: '-',
      max: '-'
    };
    this.pressure = info.pressure || null;
    this.wind = info.wind || null;

  }
}

export { IWeatherInfo, WeatherEN }
export default WeatherInfo;