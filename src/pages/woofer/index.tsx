import React from 'react';
import PlaylistList from '../../components/woofer/sidebar/PlaylistList';
// import withAuth from '../../components/hoc/withAuth'
import withStore from '../../components/hoc/withStore';
import { inject, observer } from 'mobx-react';
import PlaylistsStore from '../../store/woofer/playlistsStore';
import PlayerStore from '../../store/woofer/playerStore';
import Header from "../../components/layout/header";
import { getStore } from "../../store/index";
import PlaylistStore from '../../store/woofer/playlistStore';

import '../../style/header.scss';
import '../../style/index.scss';
import '../../style/woofer/index.scss';

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
  playlistStore: PlaylistStore,
  playerStore: PlayerStore
})
class WooferPage extends React.Component<IProps, IState> {
  static getInitialProps = async function ({ req, res, ...etc }) {
    const playlistsStore: PlaylistsStore = getStore('playlistsStore');
    await playlistsStore.fetchPlaylists();
    console.log("그렇다고 이렇게하면 두번 불릴꺼 같은데")
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