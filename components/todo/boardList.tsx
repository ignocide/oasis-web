import React, { Component } from "react";
import { inject, observer } from 'mobx-react'
import BoardItem from './boardItem'
import BoardListStore from '../../store/boardListStore'
import BoardCreateModal from './boardCreateModal';

import '../../style/todo/board-list.scss';
import { Button } from "../form";
import Icon from "../common/icon";
import Modal from '../common/modal';

interface IProps {
  boardListStore: BoardListStore
}

interface IState {
  createBoardModal: boolean
}


@inject('boardListStore')
@observer
class BoardList extends Component<IProps, IState> {

  constructor(props) {
    super(props);
    this.state = {
      createBoardModal: false
    }

  }

  onClickRequestCreateBoardButton = () => {
    this.setState({
      createBoardModal: true
    })
  };

  closeCreateBoardModal = () => {
    this.setState({
      createBoardModal: false
    })
  };

  render() {
    const {boardListStore} = this.props;
    const {boards} = boardListStore
    const {createBoardModal} = this.state;
    return (
      <div className="board-list">
        <div className={'board-list-header'}>
          {'프로젝트'}<Button className={'board-add-btn'} shape={'span'} onClick={this.onClickRequestCreateBoardButton}><Icon name={'add'} /></Button>
        </div>
        <ul>
          {boards.map((board) => <BoardItem key={board.id} board={board} />)}
        </ul>
        {createBoardModal && <Modal closeModal={this.closeCreateBoardModal}>
          <BoardCreateModal requestClose={this.closeCreateBoardModal} />
        </Modal>}
      </div>
    )
  }
}

export default BoardList