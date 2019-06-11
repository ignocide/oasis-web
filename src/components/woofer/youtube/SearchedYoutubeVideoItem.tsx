import React from 'react';
import { inject, observer } from 'mobx-react';

import YoutubeVideo from "../../../vo/woofer/youtubeVideo";
import { IconButton } from "../../form/index";
import { modalController } from "../../common/Modal";
import DropBox from "../../common/DropBox";
import { Menu, MenuItem } from "../../common/MenuForm";
import PlayerStore from "../../../store/woofer/playerStore";

import '../../../style/woofer/youtube-search-form.scss';

interface IProps {
  youtubeVideo: YoutubeVideo,
  playerStore?: PlayerStore
}

interface IState {

}

@inject('playerStore','playlistStore')
@observer
class SearchedYoutubeVideoItem extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    modalController(this, 'options');

  }

  addVideoToCurrentPlaylist = () => {
    const { youtubeVideo, playlistStore } = this.props;
    playlistStore.addVideo(youtubeVideo).then(() => {
      this.closeOptionsModal();
    });
  };

  playVideo = () => {
    const { youtubeVideo, playerStore } = this.props;
    playerStore.setTmpPlay(youtubeVideo);
  };

  render() {
    const { youtubeVideo } = this.props;
    const { modalState } = this.state;
    return (
      <div>
        <div className="video" key={youtubeVideo.videoId}>
          <div className="video-thumbnail">
            <img src={youtubeVideo.thumbnail} />
          </div>
          <div className="video-info">
            <div className="video-name">{youtubeVideo.title}</div>
            <div className="video-description">{youtubeVideo.description}</div>
          </div>
          <div className="video-function">
            <IconButton className={'playlist-add-btn'} name={'more_vert'} onClick={this.openOptionsModal} ref={'button'} />
          </div>
          <DropBox isOpen={modalState.options} requestClose={this.closeOptionsModal} parent={this.refs.button}>
            <Menu>
              <MenuItem onClick={this.addVideoToCurrentPlaylist}>{'추가하기'}</MenuItem>
              <MenuItem onClick={this.playVideo}>{'재생하기'}</MenuItem>
            </Menu>
          </DropBox>
        </div>
      </div>
    );
  }
}

export default SearchedYoutubeVideoItem;