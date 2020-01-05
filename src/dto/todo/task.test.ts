import Task from './taskDto';

describe('vo/todo/task', () => {
  test('constructor', () => {
    const mock = {
      id: 1,
      boardId: 1,
      detail: '상세내용',
      name: '테스크 제목',
      step: 'TODO',
      deleted: false,
      createdAt: new Date,
      updatedAt: new Date,
    };

    const task = new Task(mock);


    expect(task.id).toEqual(mock.id);
    expect(task.boardId).toEqual(mock.boardId);
    expect(task.deleted).toEqual(mock.deleted);
    expect(task.name).toEqual(mock.name);
    expect(task.detail).toEqual(mock.detail);
    expect(task.createdAt).toEqual(mock.createdAt);
    expect(task.updatedAt).toEqual(mock.updatedAt);
  });
});
