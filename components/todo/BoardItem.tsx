import React from "react";
import { inject, observer } from 'mobx-react';
import BoardStore from '../../store/boardStore';
import Board from "../../vo/todo/board";

import '../../style/todo/board-item.scss';
import { IconButton } from "../../components/form/index";
import DropBox from "../common/Dropbox";
import { Menu, MenuItem } from "../common/MenuForm";

interface IProps {
  boardStore: BoardStore,
  board: Board
}

@inject('boardStore')
@observer
class BoardItem extends React.Component<IProps, any> {

  constructor(props) {
    super(props);
  }

  onClickBoard = () => {
    const {boardStore, board} = this.props;
    boardStore.fetchBoard(board.id);
  };

  render() {
    const {board} = this.props;
    return (
      <li className="board-item">
        <div onClick={this.onClickBoard}>
          {board.name}
        </div>
        <DropBox box={<BoardMenu/>}><IconButton name={'more'} shape={'span'} /></DropBox>
      </li>
    );
  }
}

class BoardMenu extends React.Component<any, any> {

  render() {
    const {BoardMenu} = this.props;

    return (
      <Menu>
        <MenuItem>{'수정'}</MenuItem>
        <MenuItem>{'삭제'}</MenuItem>
      </Menu>
    );

  }
}

export default BoardItem;