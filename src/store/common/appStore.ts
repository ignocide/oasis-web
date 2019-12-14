import { action, observable } from 'mobx';
import weatherRepository from '../../api/common/weatherRepository';
import WeatherInfo from '../../dto/weatherInfo';
import SimpleLocation from '../../dto/location';


class AppStore {
  //app user datas
  @observable weather: WeatherInfo = null;
  @observable location: SimpleLocation = null;

  //app state settings
  @observable sidebar = false;

  constructor(isServer: boolean, initialData: any) {
    if (isServer) {

    }
    Object.assign(this, initialData);
  }

  @action
  toggleSidebar() {
    this.sidebar = !this.sidebar;
  }

  @action
  async fetchLocationAndWeather(lat: number, lng: number): Promise<void> {
    const { weather, location } = await weatherRepository.fetchByLocation(lat, lng);
    this.weather = weather;
    this.location = location;
  }

}

export default AppStore;