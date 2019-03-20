import { action, observable } from 'mobx'
import Playlist from '../vo/woofer/playlist';
import Board from '../vo/todo/board';
import boardRepository from '../api/server/todo/boardRepository'
import Task, { ITask } from '../vo/todo/task';

interface ITaskCreateForm {
    name: string;
}

class BoardStore {
    @observable board: Board = null;
    @observable tasks: Task[] = [];

    constructor(isServer: boolean, initialData: any) {
        Object.assign(this, initialData)
    }

    @action
    async fetchBoard(boardId: number) {
        const result: any = await boardRepository.fetchBoard(boardId);
        const { board, tasks } = result;
        this.board = new Board(board);
        this.tasks = tasks.map((task) => new Task(task));
    }

    @action
    async createTask(taskCreateFrom: ITaskCreateForm) {
        const boardId: number = this.board.id;
        const result: any = await boardRepository.createTask(boardId, taskCreateFrom);
        this.tasks.unshift(new Task(result))
    }
}
export { ITaskCreateForm }
export default BoardStore;