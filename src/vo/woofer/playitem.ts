import PlayableVideo from "./PlayableVideo";

class PlayItem extends PlayableVideo{
  id?: number;
  videoId: string;
  title: string;
  thumbnail: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(playitem: any = {}) {
    super();
    this.id = playitem.id;
    this.videoId = playitem.videoId;
    this.title = playitem.title;
    this.thumbnail = playitem.thumbnail;
    this.description = playitem.description;
    this.createdAt = playitem.createdAt;
    this.updatedAt = playitem.updatedAt;
  }
}

export default PlayItem;