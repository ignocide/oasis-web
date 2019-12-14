import PlayableVideo from './PlayableVideo';

interface IYoutubeVideo {
  id: {
    kind: string;
    videoId: string;
  };
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      high: {
        url: string;
      };
    };
  };
}

class YoutubeVideo extends PlayableVideo{
  kind: string;
  title: string;
  thumbnail: string;
  description: string;
  createdAt: Date;
  videoId: string;
  constructor(video: IYoutubeVideo) {
    super({
      videoId: video.id.videoId,
      title: video.snippet.title,
      thumbnail: video.snippet.thumbnails.high.url,
      description: video.snippet.description,
    });
    this.kind = video.id.kind;
    this.videoId = video.id.videoId;
    this.title = video.snippet.title;
    this.thumbnail = video.snippet.thumbnails.high.url;
    this.description = video.snippet.description;
  }
}

export { IYoutubeVideo };
export default YoutubeVideo;