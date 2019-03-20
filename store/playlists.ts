import { action, observable } from 'mobx'
import Playlist from '../vo/woofer/playlist';


class Playlists {
    @observable playlists: Playlist[] = [];

    constructor(isServer: boolean, initialData: any) {
        Object.assign(this, initialData)
    }

    @action
    setPlaylists = (playlists: Playlist[]) => {
        this.playlists = playlists.map((playlist) => new Playlist(playlist));
    }

    getDefaultPlaylist = () => {
        return this.playlists.find(playlist => playlist.isDefault)
    }

    @action
    concatPlaylists = (playlists: Playlist[]) => {
        this.playlists = this.playlists.concat(playlists.map((playlist) => new Playlist(playlist)));
    }

}
export default Playlists;