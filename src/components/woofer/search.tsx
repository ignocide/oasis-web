import React from 'react';
import { inject, observer } from 'mobx-react';

import SearchStore from "../../store/woofer/playlistsStore";
import PlaylistsStore from "../../store/woofer/playlistsStore";
import Playlist from 'src/dto/woofer/playlist';

import '../../style/woofer/playlists.scss';

interface IProps {
  search: SearchStore,
  playlists: PlaylistsStore
}


interface IState {

}

@inject('search')
@observer
class Search extends React.Component<IProps, IState> {
  state = {};

  render() {
    const { playlists: playlistsStore } = this.props;

    const { playlists } = playlistsStore;
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