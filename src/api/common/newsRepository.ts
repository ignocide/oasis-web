import instance from '..';
import { AxiosInstance } from 'axios';


//임시 코드
import axios from 'axios';
class NewsRepository {
  axios: AxiosInstance;

  constructor() {
    this.axios = instance;
  }

  async fetchNews(): Promise<any> {
    const result: any = await axios.get('http://192.168.0.121:8010/news');

    return result.data
  }


}

export default new NewsRepository();