import { Component } from 'react';
import '../../style/woofer/playitem.scss';
import PlayItem from "../../vo/woofer/PlaylistItem";

interface IProps {
  playlistItem: PlayItem
}

interface IState {

}

class PlayListItem extends Component<IProps, IState> {
  state = {};

  render() {
    const { playlistItem } = this.props;
    return <div className="playitem">
      <img src={playlistItem.thumbnail} />
      <div className="playitem-info">
        <p className="'playitem-title">{playlistItem.name}</p>
        <div className="'playitem-description">{playlistItem.description}</div>
        <div className="playitem-right">
          <button className="playitem-func">

          </button>
        </div>
      </div>
    </div>;
  }
}

export default PlayListItem;