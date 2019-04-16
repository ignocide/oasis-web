interface IPlaylist {
  id: number,
  name: string,
  isDefault: boolean,
  createdAt?: Date,
  updatedAt?: Date,
}

class Playlist implements IPlaylist {
  id: number;
  name: string;
  isDefault: boolean;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(playlist: IPlaylist) {
    this.id = playlist.id;
    this.name = playlist.name;
    this.isDefault = playlist.isDefault;
    this.createdAt = playlist.createdAt;
    this.updatedAt = playlist.updatedAt;
  }
}

export { IPlaylist };
export default Playlist;