import React from 'react';
import { inject, observer } from 'mobx-react';

import Board from '../../../dto/todo/boardDto';

import { Button, IconButton } from '../../form/index';
import { Menu, MenuItem } from '../../common/MenuForm';
import { FloaterRenderInfo } from '../../common/Floater';
import DropBox from '../../common/DropBox';
import Modal from '../../common/Modal';
import { ModalFooter, ModalForm, ModalHeader } from '../../common/ModalForm';
import BoardListStore from '../../../store/boardListStore';
import BoardStore from '../../../store/boardStore';

import '../../../style/todo/board-item.scss';

interface IProps {
  boardListStore: BoardListStore;
  boardStore: BoardStore;
  board: Board;
}

@inject('boardListStore', 'boardStore')
@observer
class BoardItem extends React.Component<IProps, any> {

  state = {
    isBoxOpen: false,
    floaterRenderInfo: null,
    isRemoveConfirmModalOpen: false,
  };

  constructor(props) {
    super(props);
  }

  onClickBoard = () => {
    const { boardStore, board } = this.props;
    boardStore.fetchBoard(board.id);
  };

  openBox = (e) => {
    this.setState({
      isBoxOpen: true,
      floaterRenderInfo: new FloaterRenderInfo(e)
    });
  };

  closeBox = () => {
    this.setState({
      isBoxOpen: false,
      floaterRenderInfo: null
    });
  };

  setRemoveConfirmModal = (bool: boolean) => {
    this.setState({
      isRemoveConfirmModalOpen: bool
    });
  };

  onClickRemoveConfirm = () => {
    const { boardListStore, boardStore, board } = this.props;
    boardStore.clearBoard();
    boardListStore.removeBoard(board.id).then(() => {
      this.setRemoveConfirmModal(false);
    });
  };


  render() {
    const { board } = this.props;
    const { isBoxOpen, floaterRenderInfo, isRemoveConfirmModalOpen } = this.state;

    return (
      <li className="board-item">
        <div onClick={this.onClickBoard}>
          {board.name}
        </div>
        <IconButton name={'more_vert'} onClick={this.openBox} ref={'button'} />
        <DropBox isOpen={isBoxOpen} parent={this.refs.button} requestClose={this.closeBox}>
          <Menu>
            <MenuItem>{'수정'}</MenuItem>
            <MenuItem onClick={() => this.setRemoveConfirmModal(true)}>{'삭제'}</MenuItem>
          </Menu>
        </DropBox>
        {isRemoveConfirmModalOpen &&
          <TaskRemoveModal requestClose={() => this.setRemoveConfirmModal(false)} onClickRemove={this.onClickRemoveConfirm} />}
      </li>
    );
  }
}

const TaskRemoveModal = ({ requestClose = null, onClickRemove = null }) => {
  return <Modal requestClose={requestClose}>
    <ModalForm>
      <ModalHeader>{'삭제 하시겠습니까?'}</ModalHeader>
      <ModalFooter>
        <Button shape={'text'} className={'red'} onClick={onClickRemove}>{'삭제'}</Button>
        <Button shape={'text'} onClick={requestClose}>{'취소'}</Button>
      </ModalFooter>
    </ModalForm>
  </Modal>;
};

export default BoardItem;