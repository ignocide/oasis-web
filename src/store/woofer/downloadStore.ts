import { action, observable } from 'mobx';
import playlistsRepository from '../../api/server/woofer/playlistRepository';
import PlayItem from "../../vo/woofer/playitem";
import FileDownloader from "../../lib/FileDownloader";


class DownloadStore {
  @observable downloadInfos: any = {};

  constructor(isServer: boolean, initialData: any = {}) {
    if (!isServer) {
    }


  }

  @action
  updateDownloadInfo(videoId: string, percentage: number) {
    this.downloadInfos = {
      ...this.downloadInfos,
      [videoId]: percentage
    };
  }

  @action
  async downloadVideoAsMp3(video: PlayItem) {
    const { videoId } = video;
    const response = await playlistsRepository.downloadVideoAsMp3(videoId, (progressEvent) => {
      const { loaded, total } = progressEvent;
      const percentage = Math.floor((loaded / total) * 100);
      console.log(loaded,total,progressEvent,loaded / total,percentage)
      this.updateDownloadInfo(videoId, percentage);
    });

    FileDownloader.fromBlob(response, `${video.title}.mp3`);
  }

}

export default DownloadStore;