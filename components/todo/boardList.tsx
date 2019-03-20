import React, { Component } from "react";
import { inject, observer } from 'mobx-react'
import BoardItem from './boardItem'
import Board from "../../vo/todo/board";
import BoardListStore from '../../store/boardListStore'

import '../../style/todo/board-list.scss';

interface IProps {
    boardListStore: BoardListStore
}


@inject('boardListStore')
@observer
class BoardList extends Component<IProps> {

    render() {
        const { boardListStore } = this.props;
        const { boards } = boardListStore;
        return (
            <div className="board-list">
                <h2>카테고리</h2>
                <ul>{boards.map((board) => <BoardItem key={board.id} board={board} />)}</ul>
            </div>
        )
    }
}

export default BoardList