import React, { Component } from "react";
import { inject, observer } from 'mobx-react'
import BoardStore from '../../store/board'
import Board from "../../vo/todo/board";

import '../../style/todo/board-item.scss';

interface IProps {
    boardStore: BoardStore,
    board: Board
}

@inject('boardStore')
@observer
class BoardItem extends Component<IProps> {

    onClickBoard = () => {
        const { boardStore, board } = this.props
        boardStore.fetchBoard(board.id)
    }
    render() {
        const { board } = this.props
        return (
            <div className="board-item" onClick={this.onClickBoard}>
                {board.name}
            </div>
        )
    }
}

export default BoardItem