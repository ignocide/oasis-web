import React from 'react';
import { inject, observer } from 'mobx-react';

import Video from "../../../dto/woofer/video";
import { modalController } from "../../common/Modal";
import { Menu, MenuItem } from "../../common/MenuForm";
import DropBox from "../../common/DropBox";
import { IconButton } from "../../form/index";
import PlaylistStore from "../../../store/woofer/playlistStore";
import DownloadStore from "../../../store/woofer/downloadStore";
import PlayerStore from "../../../store/woofer/playerStore";

interface IProps {
  playerStore?: PlayerStore,
  playlistStore?: PlaylistStore,
  downloadStore?: DownloadStore,
  video: Video,
}


interface IState {
}

@inject('playerStore', 'playlistStore', 'downloadStore')
@observer
class PlaylistItem extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    modalController(this, 'options');

  }

  playVideo = () => {
    const { video, playerStore } = this.props;
    playerStore.setTmpPlay(video);
    this.closeOptionsModal();
  };


  removeVideo = () => {
    const { video, playlistStore } = this.props;
    playlistStore.removeVideo(video);
    this.closeOptionsModal();
  };

  downloadVideoAsMp3 = () => {
    const { video, downloadStore } = this.props;
    downloadStore.downloadVideoAsMp3(video);
    this.closeOptionsModal();
  };

  render() {
    const { video } = this.props;
    const { modalState } = this.state;
    return (
      <div className={`video`} key={video.id}>
        <div className="video-thumbnail">
          <img src={video.thumbnail} />
        </div>
        <div className="video-info" onClick={this.playVideo}>
          <p className="video-name">{video.title}</p>
          <div className="video-description">{video.description}</div>
        </div>
        <div className="video-function">
          <IconButton className={'playlist-add-btn'} name={'more_vert'} onClick={this.openOptionsModal} ref={'button'} />
        </div>
        <DropBox isOpen={modalState.options} requestClose={this.closeOptionsModal} parent={this.refs.button}>
          <Menu>
            <MenuItem onClick={this.playVideo}>{'재생하기'}</MenuItem>
            <MenuItem onClick={this.removeVideo}>{'삭제하기'}</MenuItem>
            <MenuItem onClick={this.downloadVideoAsMp3}>{'mp3 Download'}</MenuItem>
          </Menu>
        </DropBox>
      </div>
    );
  }
}

export default PlaylistItem;