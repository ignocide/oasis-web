import React, { Component } from "react";
import { inject, observer } from 'mobx-react'
import BoardStore from '../../store/board'
import Board from "../../vo/todo/board";

import '../../style/todo/board-item.scss';
import { IconButton } from "../../components/form";

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
            <li className="board-item" >
                <div onClick={this.onClickBoard}>
                    {board.name}
                </div>
                <IconButton name={'more'} shape={'span'} />
            </li>
        )
    }
}

export default BoardItem