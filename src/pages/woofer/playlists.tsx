import React from 'react';
import PlaylistList from '../../components/woofer/sidebar/PlaylistList';
import { inject, observer } from 'mobx-react';
import withStore from '../../components/hoc/withStore';

import PlaylistsStore from '../../store/woofer/playlistsStore';
import PlayerStore from '../../store/woofer/playerStore';
import PlaylistStore from '../../store/woofer/playlistStore';
import Playlist from "../../components/woofer/playlist/Playlist";

import Header from "../../components/layout/header";
import Sidebar from "../../components/layout/sidebar";
import { getStore } from "../../store/index";

import YoutubeSearchInput from "../../components/woofer/youtube/YoutubeSearchForm";
import SearchedYoutubeVideoList from "../../components/woofer/youtube/SearchedYoutubeVideoList";
import YoutubeStore from "../../store/woofer/youtubeStore";

import '../../style/header.scss';
import '../../style/index.scss';
import '../../style/woofer/index.scss';
import Player from "../../components/woofer/player";

// import withAuth from '../../components/hoc/withAuth'

interface IProps {
  playlists: PlaylistsStore
}

interface IState {
}

@withStore({
  playlistsStore: PlaylistsStore,
  playlistStore: PlaylistStore,
  playerStore: PlayerStore,
  youtubeStore: YoutubeStore
})
class WooferPlaylistPage extends React.Component<IProps, IState> {
  static getInitialProps = async function ({ query }) {
    const playlistsStore: PlaylistsStore = getStore('playlistsStore');
    const playlistStore: PlaylistStore = getStore('playlistStore');
    const { playlistId } = query;

    if (!playlistsStore.playlists.length) {
      await playlistsStore.fetchPlaylists();
    }

    await playlistStore.fetch(playlistId);

    return {};
  };


  constructor(props) {
    super(props);

  }

  render() {
    const { playlistStore } = this.props.stores;

    return (
      <div className="main">
        <Header>
          <YoutubeSearchInput />
        </Header>
        <Sidebar>
          <PlaylistList />
        </Sidebar>
        <div id={'main-container'} className="container">
          <Player />
          <Playlist />
          <SearchedYoutubeVideoList />
        </div>
      </div>
    );
  }

}

export default inject()(observer(WooferPlaylistPage));