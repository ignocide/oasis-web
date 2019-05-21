import { action, observable } from 'mobx';
import Video from "../../vo/woofer/video";
import YoutubeVideo from "../../vo/woofer/youtubeVideo";


class PlayerStore {
  @observable queue: Video[] = [];
  @observable currentIndex: number = null;
  @observable tmpSlot: YoutubeVideo | Video = null;

  constructor(isServer: boolean, initialData: any) {
    if(isServer){

    }
    // Object.assign(this,initialData)
    this.setList(initialData.queue);
  }

  @action
  setList(queue = []) {
    this.queue = queue.map((video) => new Video(video));
    if (this.queue.length) {
      this.currentIndex = 0;
    }
  }

  @observable
  getCurrent() {
    if (this.currentIndex === null) {
      return null;
    }
    return this.queue[this.currentIndex] || null;
  }

  @action
  setCurrentIndex(index: number) {
    this.currentIndex = index;
  }

  @action
  setTmpPlay(video: YoutubeVideo | Video) {
    this.tmpSlot = video;
  }
}

export default PlayerStore;