import React from 'react';
import PlaylistList from "../components/woofer/PlaylistList";
// import withAuth from '../components/hoc/withAuth'
import withStore from '../components/hoc/withStore';
import { inject, observer } from 'mobx-react';
import PlaylistsStore from '../store/playlistsStore';
import PlayerStore from '../store/playerStore';
import Header from "../components/header";
import { getStore } from "../store/index";

import '../style/header.scss';
import '../style/index.scss';
import '../style/woofer/index.scss';

interface IProps {
  playlists: PlaylistsStore
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
  playerStore: PlayerStore
})
class WooferPage extends React.Component<IProps, IState> {
  static getInitialProps = async function ({ req, res, ...etc }) {
    if (req) {
      const playlistsStore: PlaylistsStore = getStore('playlistsStore');
      await playlistsStore.fetchPlaylists();
    }

    return {};
  };


  constructor(props) {
    super(props);

  }

  render() {

    return (
      <div className="main">
        <Header />
        <aside id={"sidebar"}>
          <PlaylistList />
        </aside>
        <div id={'main-container'} className="container">
        </div>
      </div>
    );
  }

}

export default inject()(observer(WooferPage));