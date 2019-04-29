import React from 'react';
import PlaylistList from '../../components/woofer/sidebar/PlaylistList';
import { inject, observer } from 'mobx-react';
import withStore from '../../components/hoc/withStore';

import PlaylistsStore from '../../store/woofer/playlistsStore';
import PlayerStore from '../../store/woofer/playerStore';
import PlaylistStore from '../../store/woofer/playlistStore';
import Playlist from "../../components/woofer/playlist";

import Header from "../../components/header";
import { getStore } from "../../store/index";

import '../../style/header.scss';
import '../../style/index.scss';
import '../../style/woofer/index.scss';
import YoutubeSearchInput from "../../components/woofer/YoutubeSearchForm";

// import withAuth from '../../components/hoc/withAuth'

interface IProps {
  playlists: PlaylistsStore
}

interface IState {
}

@withStore({
  playlistsStore: PlaylistsStore,
  playlistStore: PlaylistStore,
  playerStore: PlayerStore
})
class WooferPlaylistPage extends React.Component<IProps, IState> {
  static getInitialProps = async function ({ req, res, query, ...etc }) {
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
        <aside id={"sidebar"}>

          <PlaylistList />
        </aside>
        <div id={'main-container'} className="container">
          <Playlist />
        </div>
      </div>
    );
  }

}

export default inject()(observer(WooferPlaylistPage));