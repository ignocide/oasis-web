import React from 'react';
import Link from 'next/link';
import Playlists from "../components/woofer/playlists";
import { Col, Row } from "../components/layout/grid";
import Player from "../components/woofer/player";
// import withAuth from '../components/hoc/withAuth'
import withStore from '../components/hoc/withStore';
import { inject, observer } from 'mobx-react';
import PlaylistsStore from '../store/playlists';
import PlayerStore from '../store/player';

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
  playlists: PlaylistsStore,
  player: PlayerStore
})
class WooferPage extends React.Component<IProps, IState> {
  static getInitialProps = async function ({req, res, ...etc}) {
    if (req) {
      // let result: any = await wooferApi.fetchPlaylists()
      // const { playlists } = result;
      // const playlistsStore: PlaylistsStore = getStore('playlists')
      // playlistsStore.setPlaylists(playlists)
      // const defaultPlaylist = playlistsStore.getDefaultPlaylist();
      // if (defaultPlaylist) {

      // }


      // playerStore.setList(list);
    }

    return {};
  };
  setSubPage = (subPage) => {
    this.setState({
      subPage
    });
  };
  renderSubPage = () => {
    const {subPage} = this.state;
    let content = null;
    if (subPage === PAGES.PLAYLISTS) {
      content = <Playlists />;
    } else if (subPage === PAGES.SEARCH) {

    }

    return content;
  };

  constructor(props) {
    super(props);
    this.state = {
      subPage: PAGES.PLAYLISTS
    };

  }

  render() {
    const {subPage} = this.state;
    return (
      <div className="main">
        <nav id={'gnb'}>
          <div className="gnb-main">
            <div className="gnb-main-wrapper container">
              <div className="gnb-main-left">
                <Link href={'/todo'}>{"WOOFER"}</Link>
              </div>
              <div className="gnb-main-center">

              </div>
              <div className="gnb-main-right">
                <Link href={'/'}>{"로그인"}</Link>
              </div>
            </div>
          </div>
          <div className="gnb-sub">
            <div className="gnb-sub-wrapper container">
              <div className="gnb-sub-left">
                <a className={`sub-page-menu${subPage === PAGES.PLAYLISTS ? " active" : ""}`} onClick={() => this.setSubPage(PAGES.PLAYLISTS)}>{'재생목록'}</a>
                <a className={`sub-page-menu${subPage === PAGES.SEARCH ? " active" : ""}`} onClick={() => this.setSubPage(PAGES.SEARCH)}>{'검색'}</a>
                <a className={`sub-page-menu${subPage === PAGES.SUBTITLE ? " active" : ""}`} onClick={() => this.setSubPage(PAGES.SUBTITLE)}>{'자막'}</a>
              </div>
            </div>
          </div>
        </nav>
        <div className="container">
          <Row style={{paddingTop: 50}}>
            <Col size={6} layout={true}>
              <div>
                <Player />
              </div>
            </Col>
            <Col size={6} layout={true}>
              {this.renderSubPage()}
            </Col>
          </Row>
        </div>
      </div>
    );
  }

}

export default inject()(observer(WooferPage));