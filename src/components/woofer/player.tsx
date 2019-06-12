import React, { Component } from 'react';
import YouTube from 'react-youtube';
import { inject, observer } from 'mobx-react';

import PlayerStore, { YoutubeState } from "../../store/woofer/playerStore";

import { Row } from "../layout/grid";
import Icon from "../common/Icon";

import '../../style/woofer/player.scss';
import Panel, { PanelBody, PanelFooter } from "../common/Panel";
import Persistentor from "../common/Persistentor";

interface IProps {
  playerStore?: PlayerStore
}


interface IState {
  player: {
    videoState: number
  };
}

@inject('playerStore')
@observer
class Player extends Component<IProps, IState> {
  opts: any;
  defaultImageStyle: any;

  constructor(props) {
    super(props);
    this.opts = {
      height: '100%',
      width: '100%',
      playerVars: {
        autoplay: 1,
        playsinline: 1,
      },
    };
    this.defaultImageStyle = {
      backgroundColor: `black`,
      backgroundSize: 'auto 100%',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    };
    this.state = {
      player: {
        videoState: YoutubeState.UNSTART
      }
    };
  }

  onStateChange = (e) => {
    const { data: youtubeState } = e;
    const { playerStore } = this.props;
    const { videoState } = this.state.player;
    if (youtubeState == YoutubeState.END) {
      playerStore.setNextVideo();
    }
    this.setState({
      player: {
        videoState: youtubeState
      }
    });
  };

  pauseVideo = () => {
    const { internalPlayer } = this.refs.youtubePlayer;
    internalPlayer.pauseVideo();
  };

  playVideo = () => {
    const { internalPlayer } = this.refs.youtubePlayer;
    internalPlayer.playVideo();
  };

  nextVideo = () => {
    const { playerStore } = this.props;
    playerStore.setNextVideo();
  };

  render() {

    const { playerStore } = this.props;
    const { videoState } = this.state.player;
    const { current } = playerStore;
    if (!current) {
      return null;
    }
    let content = (
      <YouTube className='woofer-player' opts={this.opts} videoId={current.videoId} onStateChange={this.onStateChange} ref={'youtubePlayer'} />);
    return (
      <Panel className={'youtube-player'}>
        <PanelBody>
          <Persistentor className='player'>
            {content}
            {/*<iframe src='https://www.youtube.com/embed/i8zx49Rk-pA' frameBorder='0' allowFullScreen></iframe>*/}
          </Persistentor>
        </PanelBody>
        <PanelFooter>

          <div className={'player-controller'}>
            <Row>
              {
                videoState === YoutubeState.PLAYING ? (
                  <span className={'player-btn'} onClick={this.pauseVideo}>
                    <Icon name={'pause'} />
                  </span>
                ) : (
                  <span className={'player-btn'} onClick={this.playVideo}>
                      <Icon name={'play_arrow'} />
                    </span>
                )
              }
              <span className={'player-btn'} onClick={this.nextVideo}>
                <Icon name={'skip_next'} />
              </span>
            </Row>
          </div>
        </PanelFooter>
      </Panel>
    );
  }
}

export default Player;
