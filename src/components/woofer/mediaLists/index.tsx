import React from 'react';
import { inject, observer } from 'mobx-react';
import cn from 'classnames';
import SearchedYoutubeVideoList from "../youtube/SearchedYoutubeVideoList";
import PlaylistStore from "../../../store/woofer/playlistStore";
import Playlist from "../playlist/Playlist";
import '../../../style/woofer/media-lists.scss';

interface IProps {
  playlistStore?: PlaylistStore
}

interface IState {
  currentTab: null
}

@inject('youtubeStore')
@observer
class MediaLists extends React.Component<IProps, IState> {

  state = {
    currentTab: null
  };

  TABS = {
    PLAYLIST: "playlist_tab",
    SEARCHED_YOUTUBE_LIST: "youtube_search_list"
  };

  constructor(props) {
    super(props);

    this.state.currentTab = this.TABS.PLAYLIST;
  }

  componentDidMount() {
    const { youtubeStore } = this.props;

    youtubeStore.setSearchCallback(this.youtubeSearchCallback);
  }

  componentWillUnmount() {
    const { youtubeStore } = this.props;

    youtubeStore.removeSearchCallback(this.youtubeSearchCallback);
  }

  youtubeSearchCallback = () => {
    this.changeTab(this.TABS.SEARCHED_YOUTUBE_LIST);
    if(document){
      let searchedListForm = document.getElementById('media-lists-container');
      if(searchedListForm){
        searchedListForm.scrollIntoView(true);
      }
    }

  };

  renderList = () => {
    const { currentTab } = this.state;

    let listComponent = null;
    switch (currentTab) {
      case this.TABS.PLAYLIST: {
        listComponent = <Playlist key={'playlist'} />;
        break;
      }
      case this.TABS.SEARCHED_YOUTUBE_LIST: {
        listComponent = <SearchedYoutubeVideoList key={'searched-youtube-list'} />;
        break;
      }
      default: {
        listComponent = <Playlist key={'playlist'} />;
        break;
      }
    }

    return listComponent;
  };

  changeTab = (currentTab) => {
    this.setState({
      currentTab
    });
  };


  render() {
    const { currentTab } = this.state;
    return (<div className={'media-lists-container'} id={'media-lists-container'}>
      <ul className={'media-lists-header'}>
        <li className={cn({ active: currentTab === this.TABS.PLAYLIST })} onClick={() => this.changeTab(this.TABS.PLAYLIST)}>{'재생목록'}</li>
        <li className={cn({ active: currentTab === this.TABS.SEARCHED_YOUTUBE_LIST })} onClick={() => this.changeTab(this.TABS.SEARCHED_YOUTUBE_LIST)}>{'검색결과'}</li>
      </ul>
      <div>
        {this.renderList()}
      </div>
    </div>);
  }

}


export default MediaLists;