import instance from '../oasis';
import { AxiosInstance } from 'axios';
import { IBoardCreateForm, ITaskCreateForm, ITaskUpdateStepForm } from '../../../store/boardStore';

class BoardRepository {
  axios: AxiosInstance;

  constructor() {
    this.axios = instance;
  }

  fetchBoards() {
    return instance.get('/todo/board');
  }

  createBoard(form: IBoardCreateForm) {
    return instance.post('/todo/board', form);
  }

  fetchBoard(boardId: number) {
    return instance.get(`/todo/board/${boardId}`, {
      params: {
        sort: 'createdAt,asc'
      }
    });
  }

  removeBoard(boardId: number) {
    return instance.delete(`/todo/board/${boardId}`);
  }

  createTask(boardId: number, form: ITaskCreateForm) {
    return instance.post(`/todo/board/${boardId}/task`, form);
  }

  updateTask(boardId: number, taskId: number, form: ITaskCreateForm) {
    return instance.put(`/todo/board/${boardId}/task/${taskId}`, form);
  }

  deleteTask(boardId: number, taskId: number) {
    return instance.delete(`/todo/board/${boardId}/task/${taskId}`);
  }

  updateTaskStep(boardId: number, taskId: number, form: ITaskUpdateStepForm) {
    return instance.put(`/todo/board/${boardId}/task/${taskId}/step`, form);
  }


}

export default new BoardRepository();