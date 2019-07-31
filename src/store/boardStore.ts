import { action, observable } from 'mobx';
import Board from '../vo/todo/board';
import { getStore } from './index';
import boardRepository from '../api/server/todo/boardRepository';
import Task, { ITask, STEP } from '../vo/todo/task';

interface ITaskCreateForm {
  name: string;
  detail: string;
}

interface IBoardCreateForm {
  name: string;
}

interface ITaskUpdateForm extends ITask {
}

interface ITaskUpdateStepForm {
  step: STEP
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
    const createdBoard: any = await boardRepository.createBoard(boardCreateForm);
    const boardListStore: any = getStore('boardListStore');
    boardListStore.addBoard(createdBoard);
  }

  @action
  async fetchBoard(boardId: number) {
    const result: any = await boardRepository.fetchBoard(boardId);
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
  async createTask(taskCreateFrom: ITaskCreateForm) {
    const boardId: number = this.board.id;
    const result: any = await boardRepository.createTask(boardId, taskCreateFrom);
    this.setTasks([new Task(result), ...this.tasks]);
  }

  @action
  async updateTask(taskUpdateForm: ITaskUpdateForm) {
    const boardId: number = taskUpdateForm.boardId;
    const taskId: number = taskUpdateForm.id;
    const updatedTask: any = await boardRepository.updateTask(boardId, taskId, taskUpdateForm);
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
    const updatedTask: any = await boardRepository.updateTaskStep(boardId, taskId, taskUpdateStepForm);
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
    this.tasks = this.tasks.filter((task) => (Number(task.id) !== Number(taskId)));
  }
}

export { ITaskCreateForm, ITaskUpdateForm, IBoardCreateForm, ITaskUpdateStepForm };
export default BoardStore;