import React from 'react';
import { inject, observer } from 'mobx-react';

import '../../../style/woofer/youtube-search-form.scss';
import YoutubeStore from '../../../store/woofer/youtubeStore';
// import Icon from "../../common/Icon";
import Input from '../../basic/Input';
import cn from 'classnames';
import Icon from '../../basic/Icon';

interface IProps {
  youtubeStore?: YoutubeStore;
}


interface IState {
  query: string;
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
    const { query } = this.state;
    const { youtubeStore } = this.props;
    youtubeStore.search(query);
  };

  render() {
    const { query } = this.state;
    const {className} = this.props;
    return (
      <div className={cn('youtube-search-form',className)}>
        <form onSubmit={this.onSubmit}>
          <Icon className={'search-icon'} name={'search'} size={'xs'}/>
          <Input block value={query} onChange={this.onChangeHandler} />
        </form>
      </div>
    );
  }
}

export default YoutubeSearchInput;