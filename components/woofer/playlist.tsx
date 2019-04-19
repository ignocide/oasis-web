import React from 'react';
import { inject, observer } from 'mobx-react';

import PlaylistStore from '../../store/playlistStore';

import '../../style/woofer/playlist.scss';

interface IProps {
  playlistStore?: PlaylistStore
}


interface IState {

}

@inject('playlistStore')
@observer
class Playlist extends React.Component<IProps, IState> {

  render() {
    const { playlistStore } = this.props;
    const { items } = playlistStore.playlist;
    return <div className="playlist">
      {items.map((video, index) => {
        return <div className="video" key={video.id} onClick={() => this.setPlayer(index)}>
          <div className="video-thumbnail">
            <img src={video.thumbnail} />

          </div>
          <div className="video-info">
            <p className="video-name">{video.name}</p>
            <div className="video-description">{video.description}</div>
          </div>
          <div className="video-function">

          </div>
        </div>;
      })}
    </div>;
  }
}

export default Playlist;