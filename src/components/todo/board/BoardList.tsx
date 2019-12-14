import React from 'react';
import { inject, observer } from 'mobx-react';
import BoardListItem from './BoardListItem';
import BoardCreateModal from './BoardCreateModal';
import BoardListStore from '../../../store/boardListStore';

import Icon from '../../common/Icon';
import Modal from '../../common/Modal';
import { Button, IconButton } from '../../form';

import '../../../style/todo/board-list.scss';

interface IProps {
  boardListStore: BoardListStore;
}

interface IState {
  createBoardModal: boolean;
}


@inject('boardListStore')
@observer
class BoardList extends React.Component<IProps, IState> {

  constructor(props) {
    super(props);
    this.state = {
      createBoardModal: false
    };

  }

  onClickRequestCreateBoardButton = () => {
    this.setState({
      createBoardModal: true
    });
  };
  closeCreateBoardModal = () => {
    this.setState({
      createBoardModal: false
    });
  };


  render() {
    const {boardListStore} = this.props;
    const {boards} = boardListStore;
    const {createBoardModal} = this.state;
    return (
      <div className="board-list">
        <div className={'board-list-header'}>
          {'프로젝트'}<IconButton name={'add'} className={'board-add-btn'} onClick={this.onClickRequestCreateBoardButton}></IconButton>
        </div>
        <ul>
          {boards.map((board) => <BoardListItem key={board.id} board={board} />)}
        </ul>
        {createBoardModal && <Modal requestClose={this.closeCreateBoardModal}>
          <BoardCreateModal requestClose={this.closeCreateBoardModal} />
        </Modal>}
      </div>
    );
  }
}

export default BoardList;