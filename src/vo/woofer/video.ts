import PlayableVideo from "./PlayableVideo";

interface IVideo {
  id: number,
  videoId: string,
  title: string,
  thumbnail: string,
  description: string,
  createdAt: string | Date,
  updatedAt: string | Date,
}

class Video extends PlayableVideo{
  id: number;
  title: string;
  thumbnail: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(video: IVideo) {
    super();
    this.id = video.id;
    this.videoId = video.videoId;
    this.title = video.title;
    this.thumbnail = video.thumbnail;
    this.description = video.description;
    this.createdAt = new Date(video.createdAt);
    this.updatedAt = new Date(video.updatedAt);
  }
}

export { IVideo };
export default Video;