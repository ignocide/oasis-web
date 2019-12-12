import instance from '..';
import { AxiosInstance } from 'axios';
import { IWeatherInfo, default as WeatherInfo } from "../../vo/weatherInfo";
import { ISimpleLocation, default as SimpleLocation } from "../../vo/location";

interface IWeatherResponse {
  weather: IWeatherInfo | WeatherInfo,
  location: ISimpleLocation | SimpleLocation
}

interface IWeatherAndLocation {
  weather: WeatherInfo,
  location: SimpleLocation
}

class WeatherRepository {
  axios: AxiosInstance;

  constructor() {
    this.axios = instance;
  }

  async fetchByLocation(lat: number, lng: number): Promise<IWeatherAndLocation> {
    const result: any = await instance.get(`/life/weather/location`, {
      params: {
        lat, lng
      }
    });

    return {
      weather: new WeatherInfo(result.weather),
      location: new SimpleLocation(result.location)
    }
  }


}

export { IWeatherResponse, IWeatherAndLocation }
export default new WeatherRepository();