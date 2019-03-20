interface IBoard {
    id: number;
    userId: number;
    deleted: boolean;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

class Board implements IBoard {
    id: number;
    userId: number;
    deleted: boolean;
    name: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(board: IBoard) {
        this.id = board.id;
        this.name = board.name;
        this.userId = board.userId;
        this.createdAt = board.createdAt;
        this.updatedAt = board.updatedAt;
        this.deleted = board.deleted;
    }
}

export { IBoard }
export default Board