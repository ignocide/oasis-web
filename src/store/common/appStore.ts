import { action, observable } from 'mobx';
import weatherRepository from '../../api/common/weatherRepository';
import WeatherInfo from '../../dto/weatherInfo';
import SimpleLocation from '../../dto/location';
import News, { INews } from '~dto/new';
import newsRepository from '~api/common/newsRepository';


class AppStore {
  //app user datas
  @observable weather: WeatherInfo = null;
  @observable location: SimpleLocation = null;
  @observable news: News[] = [];
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

  @action
  async fetchNews(): Promise<void> {
    const news: INews[] = await newsRepository.fetchNews();

    this.news = news.map(article => new News(article));
  }

}

export default AppStore;