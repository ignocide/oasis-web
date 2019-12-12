import { action, observable } from 'mobx';
import ToastrMessage from '../../dto/common/toastrMessage';

class ToastrStore {
  @observable messages: ToastrMessage[] = [];
  @observable isCunsumming: boolean = false;

  constructor(isServer: boolean, initialData: any = {}) {
    if (!isServer) {
    }
    this.messages = (initialData.messages || []).map((message: any) => new ToastrMessage(message));
  }


  @action
  alert(message: ToastrMessage) {
    this.messages.push(message);
    this.run();
  }

  @action
  run(): void {
    console.log("here is run")
    const isServer = typeof window === 'undefined';

    if (isServer) {
      return;
    }
    if (this.isCunsumming || this.messages.length === 0) {
      return;
    }
    const message = this.messages[0]
    const toastrContainer = document.getElementById('toastr-container');
    const messageElement = document.createElement('div');
    messageElement.className = 'toastr-node'
    var text = document.createTextNode(message.message);

    messageElement.appendChild(text);
    console.log(toastrContainer, messageElement, message)
    toastrContainer.appendChild(messageElement)
    // const toastrConatiner = ReactDOM.findDOMNode('toastr-container')
    // const
  }

  //
  // @action
  // updateDownloadInfo(video: PlayItem, percentage: number) {
  //   this.downloadInfos = {
  //     ...this.downloadInfos,
  //     [video.videoId]: {
  //       video,
  //       progress: percentage
  //     }
  //   };
  // }
  //
  // @action
  // async downloadVideoAsMp3(video: PlayItem) {
  //   const { videoId } = video;
  //   const response = await playlistsRepository.downloadVideoAsMp3(videoId, (progressEvent) => {
  //     const { loaded, total } = progressEvent;
  //     const percentage = Math.floor((loaded / total) * 100);
  //     this.updateDownloadInfo(video, percentage);
  //   });
  //
  //   FileDownloader.fromBlob(response, `${video.title}.mp3`);
  // }
  //
  // @action
  // removeInfoByVideoId(videoId: string){
  //   delete this.downloadInfos[videoId];
  // }
}

export default ToastrStore;