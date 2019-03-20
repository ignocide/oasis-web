import instance, { urlBuilder } from '../oasis'
import { AxiosInstance } from 'axios';
import { ITaskCreateForm } from '../../../store/boardStore';

class BoardRepository {
    axios: AxiosInstance;

    constructor() {
        this.axios = instance;
    }

    fetchBoards() {
        return instance.get('/todo/board')
    }

    fetchBoard(boardId: number) {
        return instance.get(`/todo/board/${boardId}`, {
            params: {
                sort: 'createdAt,asc'
            }
        })
    }

    createTask(boardId: number, form: ITaskCreateForm) {
        return instance.post(`/todo/board/${boardId}/task`, form)
    }


}

export default new BoardRepository();