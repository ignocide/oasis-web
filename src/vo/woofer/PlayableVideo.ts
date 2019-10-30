export interface IPlayableVideo {
  videoId?: string;
  name?: string;
  description?: string;
  title: string;
  thumbnail: string;
}

class PlayableVideo {
  videoId: string;
  description: string;
  title: string;
  thumbnail: string;

  constructor(video: IPlayableVideo) {
    this.videoId = video.videoId;
    this.title = video.title || video.name;
    this.thumbnail = video.thumbnail;
    this.description = video.description;
  }
}

export default PlayableVideo;