import { action, observable } from 'mobx'
import Playlist from '../vo/woofer/playlist';
import Board, { IBoard } from '../vo/todo/board';
import boardRepository from '../api/server/todo/boardRepository'

class BoardListStore {
    @observable boards: Board[] = [];

    constructor(isServer: boolean, initialData: any) {
        Object.assign(this, initialData)
        this.setBoards(initialData.boards || [])
    }

    @action
    setBoards = (boards: Board[]) => {
        this.boards = boards.map((board) => new Board(board));
    }

    @action
    concatBoards = (boards: Board[]) => {
        this.boards = this.boards.concat(boards.map((board) => new Board(board)));
    }

    @action
    addBoard = (board: IBoard) => {
        this.boards = [...this.boards, new Board(board)];
    }

    @action
    async fetchBoards() {
        const result = await boardRepository.fetchBoards();
        const list: any[] = result.list;
        this.setBoards(list);
    }
}
export default BoardListStore;