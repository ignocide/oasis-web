import { Component } from 'react';
import { inject, observer } from 'mobx-react';

import '../../style/woofer/playlists.scss';
import SearchStore from "../../store/playlists";
import PlaylistsStore from "../../store/playlists";
import Playlist from 'vo/woofer/playlist';

interface IProps {
  search: SearchStore,
  playlists: PlaylistsStore
}


interface IState {

}

@inject('search')
@observer
class Search extends Component<IProps, IState> {
  state = {};

  render() {
    const {playlists: playlistsStore} = this.props;

    const {playlists} = playlistsStore;
    return <div className="playlists">
      <div>
        {playlists.map((playlist: Playlist) => {
          return <div className="playlist" key={playlist.id}>
            {playlist.name}
          </div>;
        })}
      </div>
    </div>;
  }
}

export default Search;