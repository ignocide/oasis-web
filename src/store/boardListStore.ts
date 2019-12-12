import { action, observable } from 'mobx';
import Board, { IBoard } from '../vo/todo/board';
import boardRepository from '../api/todo/boardRepository';

class BoardListStore {
  @observable boards: Board[] = [];

  constructor(isServer: boolean, initialData: any) {
    if (isServer) {

    }
    Object.assign(this, initialData);
    this.setBoards(initialData.boards || []);
  }

  @action
  setBoards = (boards: Board[]): void => {
    this.boards = boards.map((board) => new Board(board));
  };

  @action
  concatBoards = (boards: Board[]): void => {
    this.boards = this.boards.concat(boards.map((board) => new Board(board)));
  };

  @action
  addBoard = (board: IBoard): void => {
    this.boards = [...this.boards, new Board(board)];
  };

  @action
  async fetchBoards(): Promise<void> {
    const result: any = await boardRepository.fetchBoards();
    const list: any[] = result.list;
    this.setBoards(list);
  }

  @action
  async removeBoard(boardId: number): Promise<void> {
    await boardRepository.removeBoard(boardId);
    this.boards = this.boards.filter((board) => {
      return board.id !== boardId;
    });
  }
}

export default BoardListStore;