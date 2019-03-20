
import {Component} from 'react';
import '../../style/woofer/playitem.scss';
import PlayItem from "../../vo/woofer/playitem";

interface IProps {
  playitem: PlayItem
}

interface IState {

}

class PlayListItem extends Component<IProps,IState>{
  state = {

  }

  render (){
    const {playitem} = this.props;
    return <div className="playitem">
      <img src={playitem.thumbnail}/>
      <div className="playitem-info">
        <p className="'playitem-title">{playitem.name}</p>
        <div className="'playitem-description">{playitem.description}</div>
        <div className="playitem-right">
          <button className="playitem-func">

          </button>
        </div>
      </div>
    </div>;
  }
}

export default PlayListItem