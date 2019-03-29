import { action, observable } from 'mobx'
import Playlist from '../vo/woofer/playlist';
import Board from '../vo/todo/board';
import { getStore } from './index'
import boardRepository from '../api/server/todo/boardRepository'
import Task, { ITask } from '../vo/todo/task';

interface ITaskCreateForm {
    name: string;
    detail: string;
}

interface IBoardCreateForm {
    name: string;
}

interface ITaskUpdateForm extends ITask {
}

class BoardStore {
    @observable board: Board = null;
    @observable tasks: Task[] = [];

    constructor(isServer: boolean, initialData: any) {
        Object.assign(this, initialData)
    }

    @action setTasks(tasks: Task[]) {
        this.tasks = tasks;
    }
    @action
    async createBoard(boardCreateForm: IBoardCreateForm) {
        const createdBoard: any = await boardRepository.createBoard(boardCreateForm)
        const boardListStore: any = getStore('boardListStore');
        console.log(boardListStore);
        boardListStore.addBoard(createdBoard)
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
        // this.tasks.unshift(new Task(result))
        // console.log(this.tasks, result)
        this.setTasks([new Task(result), ...this.tasks])
        // this.tasks = [new Task(result), ...this.tasks]
    }

    @action
    async updateTask(taskUpdateForm: ITaskUpdateForm) {
        const boardId: number = taskUpdateForm.id;
        const taskId: number = taskUpdateForm.id;
        const updatedTask: any = await boardRepository.updateTask(boardId, taskId, taskUpdateForm);
        this.tasks = this.tasks.map((task) => {
            if (Number(task.id) === Number(updatedTask.id)) {
                return updatedTask
            }
            return task
        })
    }

    @action
    async deleteTask(boardId: number, taskId: number) {
        await boardRepository.deleteTask(boardId, taskId);
        this.tasks = this.tasks.filter((task) => (Number(task.id) !== Number(taskId)))
    }
}
export { ITaskCreateForm, ITaskUpdateForm, IBoardCreateForm }
export default BoardStore;