interface IVideo {
  id: number,
  videoId: string,
  name: string,
  thumbnail: string,
  description: string,
  ctime: Date,
  utime: Date,
}

class Video<IVideo> {
  id: number;
  videoId: string;
  name: string;
  thumbnail: string;
  description: string;
  ctime: Date;
  utime: Date;

  constructor(video: IVideo) {
    this.id = video.id;
    this.videoId = video.videoId;
    this.name = video.name;
    this.thumbnail = video.thumbnail;
    this.description = video.description;
    this.ctime = video.ctime;
    this.utime = video.utime;
  }
}

export { IVideo }
export default Video