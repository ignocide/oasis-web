import React from 'react';
import { inject, observer } from 'mobx-react';

import PlaylistStore from '../../store/woofer/playlistStore';

import '../../style/woofer/youtube-search-form.scss';

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
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
  };

  render() {
    const { query } = this.state;

    return (
      <div className="youtube-search-form">
        <form onSubmit={this.onSubmit}>
          <input className="input" value={query} onChange={this.onChangeHandler} />
        </form>
      </div>
    );
  }
}

export default YoutubeSearchInput;