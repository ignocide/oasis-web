import { Component } from 'react';
import YouTube from 'react-youtube';
import { inject, observer } from 'mobx-react';

import Playlist from "./playlist/playlist";
import PlayerStore from "../../store/woofer/playerStore";

import '../../style/woofer/player.scss';


interface IProps {
  playerStore?: PlayerStore
}


interface IState {

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

  onStateChange = (e) => {
    const {data} = e;


  }

  render() {

    let content = null;
    const { playerStore } = this.props;
    const current = playerStore.tmpSlot || playerStore.getCurrent();
    if (!current) {
      return null;
    }
      content = (<YouTube className='woofer-player' opts={this.opts} videoId={current.videoId} onStateChange={this.onStateChange}/>);
    return (
      <div>
        <div className='player'>
          {content}
          {/*<iframe src='https://www.youtube.com/embed/i8zx49Rk-pA' frameBorder='0' allowFullScreen></iframe>*/}
        </div>
      </div>
    );
  }
}

export default Player;
