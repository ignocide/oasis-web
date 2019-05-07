import React from 'react';
import { inject, observer } from 'mobx-react';

import '../../../style/woofer/youtube-search-form.scss';
import YoutubeStore from "../../../store/woofer/youtubeStore";
import Panel, { PanelBody, PanelHeader } from "../../common/Panel";
import YoutubeVideo from "../../../vo/woofer/youtubeVideo";

interface IProps {
  youtubeVideo: YoutubeVideo
}

class SearchedYoutubeVideoItem extends React.Component<IProps> {
  constructor(props) {
    super(props);

  }

  render() {
    const { youtubeVideo } = this.props;

    return (
      <div className="video" key={youtubeVideo.videoId}>
        <div className="video-thumbnail">
          <img src={youtubeVideo.thumbnail} />
        </div>
        <div className="video-info">
          <p className="video-name">{youtubeVideo.title}</p>
          <div className="video-description">{youtubeVideo.description}</div>
        </div>
        <div className="video-function">

        </div>
      </div>
    );
  }
}

export default SearchedYoutubeVideoItem;