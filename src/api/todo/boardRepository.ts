import instance from '..';
import { AxiosInstance, AxiosResponse } from 'axios';
import { IBoardCreateForm, ITaskCreateForm, ITaskUpdateStepForm } from '../../store/boardStore';
import { IBoard } from '~dto/todo/boardDto';
import { ITask } from '~dto/todo/taskDto';


export interface ICreateBoardResponse extends IBoard {

}

export interface ICreateTaskResponse extends ITask {

}

export interface IUpdatedTaskReponse extends ITask {

}
export interface IFetchBoardResponse {
  board: IBoard;
  tasks: ITask[]
}

export interface IUpdateBoardResponse extends IBoard {

}
export interface IFetchBoardListResponse {
  list: IBoard[];
}

class BoardRepository {
  axios: AxiosInstance;

  constructor() {
    this.axios = instance;
  }

  async fetchBoards(): Promise<IFetchBoardListResponse> {
    const response: AxiosResponse<IFetchBoardListResponse> = await instance.get('/todo/board');
    return response.data;
  }

  async createBoard(form: IBoardCreateForm): Promise<ICreateBoardResponse> {
    const response: AxiosResponse<ICreateBoardResponse> = await instance.post('/todo/board', form);

    return response.data;
  }

  async updateBoard(boardId: number, form: IBoardUpdateForm): Promise<IUpdateBoardResponse> {
    const response: AxiosResponse<IUpdateBoardResponse> = await instance.put(`/todo/board/${boardId}`, form);

    return response.data;
  }
  async fetchBoard(boardId: number): Promise<IFetchBoardResponse> {
    const response: AxiosResponse<IFetchBoardResponse> = await instance.get(`/todo/board/${boardId}`, {
      params: {
        sort: 'createdAt,asc'
      }
    });

    return response.data;
  }

  async removeBoard(boardId: number): Promise<void> {
    await instance.delete(`/todo/board/${boardId}`);
  }

  async createTask(boardId: number, form: ITaskCreateForm): Promise<ICreateTaskResponse> {
    const response: AxiosResponse<ICreateTaskResponse> = await instance.post(`/todo/board/${boardId}/task`, form);

    return response.data;
  }

  async updateTask(boardId: number, taskId: number, form: ITaskCreateForm): Promise<IUpdatedTaskReponse> {
    const response: AxiosResponse<IUpdatedTaskReponse> = await instance.put(`/todo/board/${boardId}/task/${taskId}`, form);

    return response.data;
  }

  async deleteTask(boardId: number, taskId: number): Promise<void> {
    await instance.delete(`/todo/board/${boardId}/task/${taskId}`);
  }

  async updateTaskStep(boardId: number, taskId: number, form: ITaskUpdateStepForm): Promise<IUpdatedTaskReponse> {
    const response: AxiosResponse<IUpdatedTaskReponse> = await instance.put(`/todo/board/${boardId}/task/${taskId}/step`, form);

    return response.data;
  }
}

export default new BoardRepository();