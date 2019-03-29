import { Component } from 'react';
import YouTube from 'react-youtube';
import { inject, observer } from 'mobx-react';

import Playlist from "./playlist";
import PlayerStore from "../../store/player";

import '../../style/woofer/player.scss';


interface IProps {
  player?: PlayerStore
}


interface IState {

}

@inject('player')
@observer
class PlayerComponent extends Component<IProps, IState> {
  opts: any;
  defaultImageStyle: any;

  constructor(props) {
    super(props);
    this.opts = {
      height: '100%',
      width: '100%',
      playerVars: {
        playsinline: 1,
      },
    };
    this.defaultImageStyle = {
      backgroundColor: `black`,
      backgroundSize: 'auto 100%',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    };

  }

  render() {

    let content = null;
    const {player: playerStore} = this.props;
    const current = playerStore.getCurrent();
    if (current) {
      content = (<YouTube className='woofer-player' opts={this.opts} videoId={current.video_id} />);
    }
    else {
      content = (<span style={this.defaultImageStyle} />);
    }
    return (
      <div>
        <div className='player'>
          {content}
          {/*<iframe src='https://www.youtube.com/embed/i8zx49Rk-pA' frameBorder='0' allowFullScreen></iframe>*/}
        </div>
        <Playlist />
      </div>
    );
  }
}

export default PlayerComponent;
