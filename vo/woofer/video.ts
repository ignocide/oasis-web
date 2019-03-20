interface IVideo {
  item_id: number,
  video_id: string,
  name: string,
  thumbnail: string,
  description: string,
  ctime: Date,
  utime: Date,
}

class Video<IVideo> {
  item_id: number;
  video_id: string;
  name: string;
  thumbnail: string;
  description: string;
  ctime: Date;
  utime: Date;

  constructor(video: IVideo) {
    this.item_id = video.item_id;
    this.video_id = video.video_id;
    this.name = video.name;
    this.thumbnail = video.thumbnail;
    this.description = video.description;
    this.ctime = video.ctime;
    this.utime = video.utime;
  }
}

export { IVideo }
export default Video