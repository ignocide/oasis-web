
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

    this.weather = info.weather;
    this.weatherType = info.weatherType;
    this.time = new Date(info.time);
    this.visibility = info.visibility;
    this.sunrise = new Date(info.sunrise);
    this.sunset = new Date(info.sunset);
    this.measureLocation = info.measureLocation;
    this.temp = info.temp || {
      current: '-',
      min: '-',
      max: '-'
    };
    this.pressure = info.pressure;
    this.wind = info.wind;

  }
}

export { IWeatherInfo, WeatherEN }
export default WeatherInfo;