import React from 'react';
import { inject, observer } from 'mobx-react';

import '../../../style/woofer/youtube-search-form.scss';
import YoutubeStore from "../../../store/woofer/youtubeStore";
import Panel, { PanelBody, PanelHeader } from "../../common/Panel";
import YoutubeVideo from "../../../vo/woofer/youtubeVideo";
import SearchedYoutubeVideoItem from "./SearchedYoutubeVideoItem";

interface IProps {
  youtubeStore?: YoutubeStore
}

class SearchedYoutubeVideoList extends React.Component<IProps> {
  constructor(props) {
    super(props);
  }

  render() {
    const { list } = this.props.youtubeStore;

    if (!list.length) {
      return null;
    }

    return (
      <Panel className={'playlist-container'}>
        <PanelHeader>{'검색 결과'}</PanelHeader>
        <div className={'playlist'}>
          {list.map((item: YoutubeVideo) => {
            return <SearchedYoutubeVideoItem youtubeVideo={item} />;
          })}
        </div>
      </Panel>
    );
  }
}

export default inject('youtubeStore')(observer(SearchedYoutubeVideoList));