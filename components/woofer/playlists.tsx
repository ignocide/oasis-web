import { Component } from 'react';
import { inject, observer } from 'mobx-react';

import '../../style/woofer/playlists.scss';
import PlaylistsStore from "../../store/playlists";

interface IProps {
  playlists: PlaylistsStore
}


interface IState {

}

@inject('auth', 'playlists')
@observer
class Playlists extends Component<IProps, IState> {
  state = {};

  render() {
    const {playlists: playlistsStore} = this.props;

    const {playlists} = playlistsStore;
    return <div className="playlists">
      <div>
        {playlists.map(playlist => {
          return <div className="playlist" key={playlist.id}>
            {playlist.name}
          </div>;
        })}
      </div>
    </div>;
  }
}

export default Playlists;