import { action, observable } from 'mobx';
import Playlist from '../../vo/woofer/playlist';
import playlistsRepository from '../../api/server/woofer/playlistRepository';


class PlaylistStore {
  @observable playlist?: Playlist = null;

  constructor(isServer: boolean, initialData: any = {}) {
    this.playlist = initialData.playlist ? new Playlist(initialData.playlist) : null;
  }

  @action
  async fetch(playlistId: number) {
    let response: any = await playlistsRepository.fetch(playlistId);
    this.playlist = new Playlist(response);
    // this.playlist = response.playlists.map((playlist) => new Playlist(playlist))
  }
}

export default PlaylistStore;