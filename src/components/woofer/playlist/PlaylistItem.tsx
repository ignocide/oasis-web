import React from 'react';
import { inject, observer } from 'mobx-react';

import '../../../style/woofer/playlist.scss';
import PlayerStore from "../../store/woofer/playerStore";
import Video from "../../../vo/woofer/video";
import { modalController } from "../../common/Modal";
import { Menu, MenuItem } from "../../common/MenuForm";
import DropBox from "../../common/DropBox";
import { IconButton } from "../../form/index";

interface IProps {
  playerStore?: PlayerStore,
  video: Video,
}


interface IState {
}

@inject('playerStore')
@observer
class PlaylistItem extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    modalController(this, 'options');

  }

  playVideo = () => {
    const { video, playerStore } = this.props;
    playerStore.setTmpPlay(video);
  };

  render() {
    const { video } = this.props;
    const { modalState } = this.state;
    return (
      <div className="video" key={video.id}>
        <div className="video-thumbnail">
          <img src={video.thumbnail} />

        </div>
        <div className="video-info" onClick={this.playVideo}>
          <p className="video-name">{video.title}</p>
          <div className="video-description">{video.description}</div>
        </div>
        <div className="video-function">
          <IconButton className={'playlist-add-btn'} name={'more'} onClick={this.openOptionsModal} ref={'button'} />
        </div>
        <DropBox isOpen={modalState.options} requestClose={this.closeOptionsModal} parent={this.refs.button}>
          <Menu>
            <MenuItem onClick={this.playVideo}>{'재생하기'}</MenuItem>
          </Menu>
        </DropBox>
      </div>
    );
  }
}

export default PlaylistItem;