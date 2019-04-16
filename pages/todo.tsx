import React from 'react';
// import withAuth from '../components/hoc/withAuth'
// import withStore from '../components/hoc/withStore';
import { inject, observer } from 'mobx-react';

import { getStore } from "../store/index";
import Header from '../components/header';
import BoardList from '../components/todo/board/BoardList';
import TaskList from '../components/todo/task/TaskList';
import withStore from '../components/hoc/withStore';
import BoardListStore from '../store/boardListStore';
import BoardStore from '../store/boardStore';
import Board from "../vo/todo/board";

import '../style/header.scss';
import '../style/index.scss';
import '../style/woofer/index.scss';

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
class TodoPage extends React.Component<IProps, IState> {
  static getInitialProps = async function ({ req, res, ...etc }) {

    const boardListStore: BoardListStore = getStore('boardListStore');
    const { boards } = boardListStore;
    if (!boards.length) {
      await boardListStore.fetchBoards();
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
          <BoardList />
        </aside>
        <div id={'main-container'} className="container">
          <TaskList />
        </div>
      </div>
    );
  }

}

export default inject()(observer(TodoPage));