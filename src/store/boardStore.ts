import { action, observable } from 'mobx';
import Board, { IBoard } from '../dto/todo/boardDto';
import { getStore } from './index';
import boardRepository, { IFetchBoardResponse, IUpdateBoardResponse } from '~api/todo/boardRepository';
import Task, { ITask, STEP } from '~dto/todo/taskDto';
import BoardListStore from './boardListStore';

interface ITaskCreateForm {
	name: string;
	detail?: string;
}

export interface IBoardCreateForm {
	name: string;
}

export interface IBoardUpdateForm {
	name: string;
}

type ITaskUpdateForm = ITask;

interface ITaskUpdateStepForm {
	step: STEP;
}

class BoardStore {
	@observable board: Board = null;
	@observable tasks: Task[] = [];

	constructor(isServer: boolean, initialData: any) {
		if (isServer) {
		}
		Object.assign(this, initialData);
	}

	@action
	setTasks(tasks: Task[]) {
		this.tasks = tasks;
	}

	@action
	async createBoard(boardCreateForm: IBoardCreateForm) {
		const createdBoard: IBoard = await boardRepository.createBoard(boardCreateForm);
		const boardListStore: BoardListStore = getStore('boardListStore');
		boardListStore.addBoard(createdBoard);
	}

	@action
	async fetchBoard(boardId: number) {
		const result: IFetchBoardResponse = await boardRepository.fetchBoard(boardId);
		const { board, tasks } = result;
		this.board = new Board(board);
		this.tasks = tasks.map((task: Task) => new Task(task));
	}

	@action
	async clearBoard() {
		this.board = null;
		this.tasks = [];
	}

	@action
	async updateBoard(boardId: number, form: IBoardUpdateForm): Promise<void> {
		const result: IUpdateBoardResponse = await boardRepository.updateBoard(boardId, form)
		const boardListStore: BoardListStore = getStore('boardListStore');
		boardListStore.fetchBoards();
		this.board = new Board(result);
	}

	@action
	async createTask(taskCreateFrom: ITaskCreateForm) {
		const boardId: number = this.board.id;
		const result: any = await boardRepository.createTask(boardId, taskCreateFrom);
		this.setTasks([new Task(result), ...this.tasks]);
	}

	@action
	async updateTask(taskUpdateForm: ITaskUpdateForm) {
		const boardId: number = taskUpdateForm.boardId;
		const taskId: number = taskUpdateForm.id;
		const updatedTask: ITask = await boardRepository.updateTask(boardId, taskId, taskUpdateForm);
		this.tasks = this.tasks.map((task) => {
			if (Number(task.id) === Number(updatedTask.id)) {
				return new Task(updatedTask);
			}
			return task;
		});
	}

	@action
	async updateTaskStep(task: Task, taskUpdateStepForm: ITaskUpdateStepForm) {
		const boardId: number = task.boardId;
		const taskId: number = task.id;
		const updatedTask: ITask = await boardRepository.updateTaskStep(boardId, taskId, taskUpdateStepForm);
		this.tasks = this.tasks.map((task) => {
			if (Number(task.id) === Number(updatedTask.id)) {
				return updatedTask;
			}
			return task;
		});
	}

	@action
	async deleteTask(boardId: number, taskId: number) {
		await boardRepository.deleteTask(boardId, taskId);
		this.tasks = this.tasks.filter((task) => Number(task.id) !== Number(taskId));
	}
}

export { ITaskCreateForm, ITaskUpdateForm, IBoardCreateForm, ITaskUpdateStepForm };
export default BoardStore;
