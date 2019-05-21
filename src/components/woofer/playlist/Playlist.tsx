import React from 'react';
import { inject, observer } from 'mobx-react';

import PlaylistStore from '../../../store/woofer/playlistStore';

import '../../../style/woofer/playlist.scss';
import PlayerStore from "../../store/woofer/playerStore";
import PlayListItem from "../playlistItem";
import PlaylistItem from "./PlaylistItem";

interface IProps {
  playlistStore?: PlaylistStore
}


interface IState {
  playerStore?: PlayerStore
}

@inject('playlistStore')
@observer
class Playlist extends React.Component<IProps, IState> {

  playVideo = () => {
    const { youtubeVideo, playerStore } = this.props;
    playerStore.setTmpPlay(youtubeVideo);
  };

  render() {
    const { playlistStore } = this.props;
    const { videos } = playlistStore;
    console.log(videos.length);
    return <div className="playlist">
      {videos.map((video) => {
        return <PlaylistItem video={video} key={video.id}/>;
      })}
    </div>;
  }
}

export default Playlist;