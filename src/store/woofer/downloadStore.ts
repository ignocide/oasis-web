import { action, observable } from 'mobx';
import playlistsRepository from '../../api/woofer/playlistRepository';
import PlayItem from "../../dto/woofer/playlistItem";
import FileDownloader from "../../lib/fileDownloader";


class DownloadStore {
  @observable downloadInfos: any = {};

  constructor(isServer: boolean, initialData: any = {}) {
    if (!isServer) {
    }


  }

  @action
  updateDownloadInfo(video: PlayItem, percentage: number) {
    this.downloadInfos = {
      ...this.downloadInfos,
      [video.videoId]: {
        video,
        progress: percentage
      }
    };
  }

  @action
  async downloadVideoAsMp3(video: PlayItem) {
    const { videoId } = video;
    const response = await playlistsRepository.downloadVideoAsMp3(videoId, (progressEvent) => {
      const { loaded, total } = progressEvent;
      const percentage = Math.floor((loaded / total) * 100);
      this.updateDownloadInfo(video, percentage);
    });

    FileDownloader.fromBlob(response, `${video.title}.mp3`);
  }

  @action
  removeInfoByVideoId(videoId: string) {
    delete this.downloadInfos[videoId];
  }
}

export default DownloadStore;