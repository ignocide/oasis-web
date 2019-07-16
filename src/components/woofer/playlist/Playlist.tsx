import React from 'react';
import { inject, observer } from 'mobx-react';

import PlaylistStore from '../../../store/woofer/playlistStore';

import PlayerStore from "../../../store/woofer/playerStore";
import PlaylistItem from "./PlaylistItem";
import Panel, { PanelBody, PanelHeader } from "../../common/Panel";

import '../../../style/woofer/playlist.scss';

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
    return <Panel className={'playlist-container'}>
      <PanelHeader>{'재생 목록'}</PanelHeader>
      <div className="playlist">
        {videos.map((video) => {
          return <PlaylistItem video={video} key={video.id} />;
        })}
        {
          !videos.length && "재생 목록이 없습니다."
        }
      </div>
    </Panel>;
  }
}

export default Playlist;