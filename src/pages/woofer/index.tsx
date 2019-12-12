import React from 'react';
import PlaylistList from '../../components/woofer/sidebar/PlaylistList';
// import withAuth from '../../components/hoc/withAuth'
import withStore from '../../components/hoc/withStore';
import { inject, observer } from 'mobx-react';
import PlaylistsStore from '../../store/woofer/playlistsStore';
import PlayerStore from '../../store/woofer/playerStore';
import Header from "../../components/layout/Header";
import { getStore } from "../../store/index";
import PlaylistStore from '../../store/woofer/playlistStore';

import '../../style/woofer/index.scss';
import { Row } from "../../components/basic/Grid";

interface IProps {
  playlists: PlaylistsStore,
  playlistsStore: PlaylistsStore,
  playlistStore: PlaylistStore,
  playerStore: PlayerStore
}

interface IState {
  subPage: PAGES
}

enum PAGES {
  PLAYLISTS,
  SEARCH,
  SUBTITLE,
}


@withStore({
  playlistsStore: PlaylistsStore,
  playlistStore: PlaylistStore,
  playerStore: PlayerStore
})
class WooferPage extends React.Component<IProps, IState> {
  static getInitialProps = async function ({ req, res, ...etc }) {
    const playlistsStore: PlaylistsStore = getStore('playlistsStore');
    await playlistsStore.fetchPlaylists();
    return {};
  };


  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div id="main">
        <Header />
        <aside id={"sidebar"}>
          <PlaylistList />
        </aside>
        <div id={'main-container'} className="container">
          <Row>
          </Row>
        </div>
      </div>
    );
  }

}

export default inject()(observer(WooferPage));