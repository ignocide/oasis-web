import instance from '../oasis';
import { AxiosInstance } from 'axios';
import { IWeatherInfo, default as WeatherInfo } from "../../../vo/weather";
import { ISimpleLocation, default as SimpleLocation } from "../../../vo/location";

interface IWeatherResponse {
  weather: IWeatherInfo | WeatherInfo,
  location: ISimpleLocation | SimpleLocation
}

class WeatherRepository {
  axios: AxiosInstance;

  constructor() {
    this.axios = instance;
  }

  async fetchByLocation(lat: number, lng: number): Promise<IWeatherResponse> {
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

export { IWeatherResponse }
export default new WeatherRepository();