import React from 'react';
import { inject, observer } from 'mobx-react';

import '../../../style/woofer/youtube-search-form.scss';
import YoutubeStore from "../../../store/woofer/youtubeStore";

interface IProps {
  youtubeStore?: YoutubeStore
}


interface IState {
  query: string
}

@inject('youtubeStore')
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
    const {query} = this.state;
    const {youtubeStore} = this.props;
    youtubeStore.search(query)
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