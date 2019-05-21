export interface IPlaylist {
  id: number,
  name: string,
  isDefault: boolean,
  createdAt?: string | null,
  updatedAt?: string | null,
}

class Playlist {
  id: number;
  name: string;
  isDefault: boolean;
  createdAt?: Date | null;
  updatedAt?: Date | null;

  constructor(playlist: IPlaylist) {
    this.id = playlist.id;
    this.name = playlist.name;
    this.isDefault = playlist.isDefault;
    this.createdAt = playlist.createdAt ? new Date(playlist.createdAt) : null;
    this.updatedAt = playlist.updatedAt ? new Date(playlist.updatedAt) : null;
  }
}

export default Playlist;