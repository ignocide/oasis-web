import PlayableVideo from "./PlayableVideo";

class PlayItem extends PlayableVideo {
  id?: number;
  videoId: string;
  title: string;
  thumbnail: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(playlistItem: any = {}) {
    super(playlistItem);
    this.id = playlistItem.id || null;
    this.createdAt = playlistItem.createdAt || null;
    this.updatedAt = playlistItem.updatedAt || null;
  }
}

export default PlayItem;