import Board from './board';

describe('vo/todo/board', () => {
  test('constructor', () => {
    const mock = {
      id: 1,
      userId: 1,
      deleted: false,
      name: '프로젝트 제목',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const board = new Board(mock);


    expect(board.id).toEqual(mock.id);
    expect(board.userId).toEqual(mock.userId);
    expect(board.deleted).toEqual(mock.deleted);
    expect(board.name).toEqual(mock.name);
    expect(board.createdAt).toEqual(mock.createdAt);
    expect(board.updatedAt).toEqual(mock.updatedAt);
  });
});
