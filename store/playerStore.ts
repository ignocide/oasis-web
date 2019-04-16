import { action, observable } from 'mobx'
import Video, { IVideo } from "../vo/woofer/video";


class Player {
  @observable list: Video[] = [];
  @observable currentIndex: number = null;

  constructor(isServer: boolean, initialData: any) {
    // Object.assign(this,initialData)
    this.setList(initialData.list)
  }

  @action
  setList(list = []) {
    this.list = list.map((video) => new Video(video));
    if (this.list.length) {
      this.currentIndex = 0;
    }
  }

  @observable
  getCurrent() {
    if (this.currentIndex === null) {
      return null
    }
    return this.list[this.currentIndex] || null
  }

  @action
  setCurrentIndex(index: number) {
    this.currentIndex = index;
  }
}
export default Player;