import { Component } from 'react';
import { inject, observer } from 'mobx-react';
import PlayerStore from "../../store/player";

import '../../style/woofer/playlist.scss';

interface IProps {
  player?: PlayerStore
}


interface IState {

}

@inject('player')
@observer
class Playlist extends Component<IProps, IState> {
  state = {};

  setPlayer = (index) => {
    const {player: playerStore} = this.props;
    playerStore.setCurrentIndex(index);
  };

  render() {
    const {player: playerStore} = this.props;
    const {list} = playerStore;
    return <div className="playlist">
      {list.map((playlist, index) => {
        return <div className="video" key={playlist.item_id} onClick={() => this.setPlayer(index)}>
          <div className="video-thumbnail">
            <img src={playlist.thumbnail} />

          </div>
          <div className="video-info">
            <p className="video-name">{playlist.name}</p>
            <div className="video-description">{playlist.description}</div>
          </div>
          <div className="video-function">

          </div>
        </div>;
      })}
    </div>;
  }
}

export default Playlist;