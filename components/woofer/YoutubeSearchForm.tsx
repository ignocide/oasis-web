import React from 'react';
import { inject, observer } from 'mobx-react';

import PlaylistStore from '../../store/playlistStore';

import '../../style/woofer/playlist.scss';

interface IProps {
  playlistStore?: PlaylistStore
}


interface IState {
  query: string
}

@inject('playlistStore')
@observer
class YoutubeSearchInput extends React.Component<IProps, IState> {
  state: IState = {
    query: ''
  };

  constructor() {
    super();

  }

  onChangeHandler = (e) => {
    this.setState({
      query: e.target.value
    })
  }
  render() {
    const {query} = this.state;

    return (
      <div className="youtube-search-input">
        <input className="input" value={query} onChange={this.onChangeHandler} />
      </div>
    );
  }
}

export default YoutubeSearchInput;