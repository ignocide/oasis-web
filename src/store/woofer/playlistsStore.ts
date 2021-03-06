import { action, observable } from 'mobx';
import Playlist from '../../dto/woofer/playlist';
import playlistsRepository, { IPlaylistCreateForm } from '../../api/woofer/playlistRepository';


class Playlists {
  @observable playlists: Playlist[] = [];

  constructor(isServer: boolean, initialData: any) {
    if (isServer) {

    }
    Object.assign(this, initialData);
  }

  //
  // @action
  // setPlaylists = (playlists: Playlist[]) => {
  //     this.playlists = playlists.map((playlist) => new Playlist(playlist));
  // }
  //
  // getDefaultPlaylist = () => {
  //     return this.playlists.find(playlist => playlist.isDefault)
  // }
  //
  // @action
  // concatPlaylists = (playlists: Playlist[]) => {
  //     this.playlists = this.playlists.concat(playlists.map((playlist) => new Playlist(playlist)));
  // }
  @action
  async fetchPlaylists() {
    const response: any = await playlistsRepository.fetchList();
    this.playlists = response.playlists.map((playlist: any) => new Playlist(playlist));
  }

  @action
  async create(form: IPlaylistCreateForm) {
    const response: any = await playlistsRepository.create(form);
    this.playlists = [...this.playlists, new Playlist(response)];
  }

  @action
  async remove(playlistId: number) {
    await playlistsRepository.remove(playlistId);
    this.playlists = this.playlists.filter((playlist) => {
      return Number(playlist.id) !== playlistId;
    });
  }
}

export default Playlists;