interface IVideo {
  id: number,
  videoId: string,
  name: string,
  thumbnail: string,
  description: string,
  createdAt: string | Date,
  updatedAt: string | Date,
}

class Video {
  id: number;
  videoId: string;
  name: string;
  thumbnail: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(video: IVideo) {
    this.id = video.id;
    this.videoId = video.videoId;
    this.name = video.name;
    this.thumbnail = video.thumbnail;
    this.description = video.description;
    this.createdAt = new Date(video.createdAt);
    this.updatedAt = new Date(video.updatedAt);
  }
}

export { IVideo };
export default Video;