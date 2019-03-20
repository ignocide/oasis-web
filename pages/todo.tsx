import Link from 'next/link'
import { Component } from 'react';
import Playlists from "../components/woofer/playlists";
import { Col, Row } from "../components/layout/grid";
import Player from "../components/woofer/player";
// import withAuth from '../components/hoc/withAuth'
// import withStore from '../components/hoc/withStore';
import { inject, observer } from 'mobx-react'
import PlayerStore from '../store/player'

import '../style/header.scss'
import '../style/index.scss'
import '../style/woofer/index.scss'
import { getStore } from "../store/index";
import Playlist from 'vo/woofer/playlist';
import Header from '../components/header';
import BoardList from '../components/todo/boardList';
import TaskList from '../components/todo/taskList';
import withStore from '../components/hoc/withStore';
import BoardListStore from '../store/boardListStore';
import BoardStore from '../store/boardStore';
interface IProps {
  boards: Board[]
}

interface IState {
}

enum PAGES {
  PLAYLISTS,
  SEARCH,
  SUBTITLE,
}

// @withAuth
@withStore({
  boardListStore: BoardListStore,
  boardStore: BoardStore
})
class TodoPage extends Component<IProps, IState> {
  static getInitialProps = async function ({ req, res, ...etc }) {

    const boardListStore: BoardListStore = getStore('boardListStore')
    const { boards } = boardListStore;
    if (!boards.length) {
      await boardListStore.fetchBoards();
    }

    return {}
  }

  constructor(props) {
    super(props)
  }


  render() {
    return (
      <div className="main">
        <Header sub={
          <Link href={'/woofer'}>우퍼로</Link>
        }>
        </Header>
        <div className="container">
          <Row style={{ paddingTop: 50 }}>
            <Col size={4} layout={true}>
              <BoardList />
            </Col>
            <Col size={8} layout={true}>
              <TaskList />
            </Col>
          </Row>
        </div>
      </div>
    )
  }

}

export default inject()(observer(TodoPage));