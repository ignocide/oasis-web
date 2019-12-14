import { action, observable } from 'mobx';
import youtube from '../../lib/youtube';
import YoutubeVideo from '../../dto/woofer/youtubeVideo';


class YoutubeStore {
  @observable list: YoutubeVideo[] = [];
  searchCallbacks: Function[] = [];

  constructor(isServer: boolean, initialData: any) {
    // Object.assign(this,initialData)
    if (isServer) {

    }
    this.setList(initialData.list);
  }

  @action
  setList(list: any[] = []): void {
    this.list = list.map((video) => new YoutubeVideo(video));
  }
  //
  @action
  async search(query: string): Promise<void> {
    const list: any[] = await youtube.searchList(query);
    this.setList(list);
    this.searchCallbacks.forEach(cb => {
      cb();
    });
  }

  setSearchCallback(cb: Function): void {
    this.searchCallbacks.push(cb);
  }

  removeSearchCallback(cb: Function): void {
    this.searchCallbacks = this.searchCallbacks.filter(func => func! == cb);
  }
}
export default YoutubeStore;