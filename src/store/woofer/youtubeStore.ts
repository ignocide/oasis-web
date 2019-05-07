import { action, observable } from 'mobx'
import Video, { IVideo } from "../../vo/woofer/video";
import youtube from "../../lib/Youtube";
import YoutubeVideo from "../../vo/woofer/youtubeVideo";


class YoutubeStore {
  @observable list: YoutubeVideo[] = [];

  constructor(isServer: boolean, initialData: any) {
    // Object.assign(this,initialData)
    this.setList(initialData.list)
  }

  @action
  setList(list = []):void {
    this.list = list.map((video) => new YoutubeVideo(video));
  }
  //
  @action
  async search(query:string):Promise<void> {
    let list:any[] = await youtube.searchList(query);
    this.setList(list);
  }

}
export default YoutubeStore;