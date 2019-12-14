import React from 'react';
import PlaylistList from '../../components/woofer/sidebar/PlaylistList';
import { inject, observer } from 'mobx-react';
import withStore from '../../components/hoc/withStore';

import PlaylistsStore from '../../store/woofer/playlistsStore';
import PlayerStore from '../../store/woofer/playerStore';
import PlaylistStore from '../../store/woofer/playlistStore';

import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import { getStore } from '../../store/index';

import YoutubeSearchInput from '../../components/woofer/youtube/YoutubeSearchForm';
import YoutubeStore from '../../store/woofer/youtubeStore';

import '../../style/woofer/index.scss';
import Player from '../../components/woofer/player';
import DownloadStore from '../../store/woofer/downloadStore';
import { Col, Row } from '../../components/basic/Grid';
import MediaLists from '../../components/woofer/mediaLists/index';
import YoutubeDownloader from '../../components/woofer/sidebar/downloader';
import DownloadManager from '../../components/woofer/DownloadManager';

// import withAuth from '../../components/hoc/withAuth'

interface IProps {
  playlists: PlaylistsStore;
}

interface IState {
}

@withStore({
  playlistsStore: PlaylistsStore,
  playlistStore: PlaylistStore,
  playerStore: PlayerStore,
  youtubeStore: YoutubeStore,
  downloadStore: DownloadStore
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

    return (
      <div id="main">
        <Header>
        </Header>
        <Sidebar>
          <YoutubeSearchInput />
          <PlaylistList />
          <YoutubeDownloader />
        </Sidebar>
        <div id={'main-container'} className="container">
          <Row>
            <Col>
              <Player />
            </Col>
            {/**/}
            <Col>
              <MediaLists />
            </Col>

            {/*<Playlist />*/}
            {/*<SearchedYoutubeVideoList />*/}
          </Row>
        </div>
        <DownloadManager/>
      </div>
    );
  }

}

export default inject()(observer(WooferPlaylistPage));