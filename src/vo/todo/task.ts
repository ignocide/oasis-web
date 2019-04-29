interface ITask {
  id: number;
  boardId: number;
  detail: string;
  name: string;
  step: string;
  deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

enum STEP {
  TODO = 'TODO',
  DONE = 'DONE'
}


class Task implements ITask {
  id: number;
  boardId: number;
  detail: string;
  name: string;
  step: string;
  deleted: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(task: ITask) {
    this.id = task.id;
    this.boardId = task.boardId;
    this.name = task.name;
    this.detail = task.detail;
    this.step = task.step;
    this.createdAt = task.createdAt;
    this.updatedAt = task.updatedAt;
    this.deleted = task.deleted;
  }
}

export { ITask,STEP };
export default Task;