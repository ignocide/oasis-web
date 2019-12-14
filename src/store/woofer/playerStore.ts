import { action, observable } from 'mobx';
import Video from '../../dto/woofer/video';
import PlayableVideo from '../../dto/woofer/playableVideo';

export enum PLAYMODE {
  RANDOM,
  REPEAT,
  FALT
}


export enum YoutubeState {
  UNSTART = -1,
  END = 0,
  PLAYING = 1,
  STOP = 2,
  BUFFERING = 3,
  READY = 5
}

class PlayerStore {
  @observable queue: Video[] = [];
  @observable currentIndex: number = null;
  @observable current: PlayableVideo = null;
  @observable tmpSlot: PlayableVideo = null;
  history: string[] = [];
  historySize = 100;

  constructor(isServer: boolean, initialData: any) {
    if (isServer) {

    }
    // Object.assign(this,initialData)
    this.setList(initialData.queue);
  }

  //init list
  @action
  setList(queue: Video[] = []) {
    this.queue = queue;
  }

  @observable
  getCurrent(): PlayableVideo {
    return this.current;
  }

  @action
  setCurrentIndex(index: number) {
    this.currentIndex = index;
  }

  @action
  setTmpPlay(video: PlayableVideo) {
    this.current = video;
  }

  addHistory(videoId: string) {
    if (this.history.indexOf(videoId) === -1) {
      this.history.push(videoId);
      if (this.history.length > this.historySize) {
        this.history.shift();
      }
    }
  }

  @action
  setNextVideo(): PlayableVideo {
    if (!this.queue.length) {
      return null;
    }

    const unPlayedList = this.queue.filter((video) => {
      return this.history.indexOf(video.videoId) === -1;
    });

    // let nextVideo:Video  = unPlayedList[randomIndex];
    let list: Video[] = unPlayedList;
    if (!unPlayedList.length) {
      this.history = [];
      list = this.queue;
    }
    const randomIndex = Math.floor(Math.random() * list.length);
    const nextVideo = list[randomIndex];
    this.addHistory(nextVideo.videoId);
    this.current = nextVideo;
  }
}

export default PlayerStore;