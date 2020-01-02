import React from 'react';
import { inject, observer } from 'mobx-react';
import BoardListItem from './BoardListItem';
import BoardCreateModal from './BoardCreateModal';
import BoardListStore from '../../../store/boardListStore';
import BoardStore from '../../../store/boardStore';
import cn from 'classnames';

import Icon from '../../common/Icon';
import Modal from '../../common/Modal';
import Button from '../../basic/Button';

interface IProps {
  boardListStore: BoardListStore;
  boardStore: BoardStore;
}

interface IState {
  createBoardModal: boolean;
}


@inject('boardListStore', 'boardStore')
@observer
class BoardList extends React.Component<IProps, IState> {

  constructor(props) {
    super(props);
    this.state = {
      createBoardModal: false
    };

  }

  onClickRequestCreateBoardButton = (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    this.setState({
      createBoardModal: true
    });
  };
  closeCreateBoardModal = () => {
    this.setState({
      createBoardModal: false
    });
  };

  onClickBoard = (board) => {
    const { boardStore } = this.props;
    boardStore.fetchBoard(board.id);
  };


  render() {
    const { boardListStore, boardStore } = this.props;
    const { boards } = boardListStore;
    const { board: currentBoard } = boardStore
    const currentBoardId = currentBoard ? currentBoard.id : null;
    const { createBoardModal } = this.state;
    return (
      <div className="board-list">
        {/* <ul className="sidebar-header">
          <li>{'프로젝트 추가하기'}<IconButton name={'add'} className={'board-add-btn'} onClick={this.onClickRequestCreateBoardButton}></IconButton></li>
        </ul> */}
        <Button shape={'solid'} size={'sm'} onClick={this.onClickRequestCreateBoardButton}>{'프로젝트 추가하기'}</Button>
        <ul className="sidebar-list">
          {/* {boards.map((board) => <BoardListItem key={board.id} board={board} />)} */}
          {boards.map(board => <li className={cn({ 'active': currentBoardId === board.id })} key={board.id} onClick={() => this.onClickBoard(board)}>{board.name}</li>)}
        </ul>
        {createBoardModal && <Modal requestClose={this.closeCreateBoardModal}>
          <BoardCreateModal requestClose={this.closeCreateBoardModal} />
        </Modal>}
      </div>
    );
  }
}

export default BoardList;