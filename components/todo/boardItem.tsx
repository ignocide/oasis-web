import React from "react";
import { inject, observer } from 'mobx-react';
import BoardStore from '../../store/boardStore';
import Board from "../../vo/todo/board";

import '../../style/todo/board-item.scss';
import { IconButton } from "../../components/form";

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
        <IconButton name={'more'} shape={'span'} />
      </li>
    );
  }
}

export default BoardItem;