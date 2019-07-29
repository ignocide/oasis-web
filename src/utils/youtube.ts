class YoutubeUtil {
  parseRegex = /(https?:\/\/)?(www.)?(youtube\.com|youtu\.be|youtube-nocookie\.com)\/(?:embed\/|v\/|watch\?v=|watch\?list=(.*)&v=|watch\?(.*[^&]&)v=)?((\w|-){11})(&list=(\w+)&?)?/;

  getVideoIdFromUrl(url: string): string | null {
    const matches = this.parseRegex.exec(url);
    let videoId = null;

    if (matches && matches[6]) {
      videoId = matches[6];
    }

    return videoId;
  }
}


export default new YoutubeUtil();