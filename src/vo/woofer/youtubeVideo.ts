interface IYoutubeVideo {
  id: {
    kind: string,
    videoId: string
  },
  snippet: {
    title: string,
    description: string,
    thumbnails: {
      high: {
        url: string,
      }
    }
  },
}

class YoutubeVideo {
  kind: string;
  videoId: string;
  description: string;
  title: string;
  thumbnail: string;

  constructor(video: IYoutubeVideo) {
    this.kind = video.id.kind;
    this.videoId = video.id.videoId;
    this.title = video.snippet.title;
    this.thumbnail = video.snippet.thumbnails.high.url;
    this.description = video.snippet.description;
  }
}

export { IYoutubeVideo };
export default YoutubeVideo;