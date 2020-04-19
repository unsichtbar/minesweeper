enum DIFFICULTY {
    EASY, MEDIUM, HARD
}

interface StartNode {
    x: number
    y: number
}

class Minesweeper {
    private _board: Array<Array<Tile>>
    private numMines: number
    constructor(difficulty: DIFFICULTY = DIFFICULTY.MEDIUM, startNode: StartNode = { x: 0, y: 0 }) {
        switch (difficulty) {
            case DIFFICULTY.EASY: {
                this._board = this.makeBoard(10);
                this.numMines = 10
                break;
            }
            case DIFFICULTY.MEDIUM: {
                this._board = this.makeBoard(18);
                this.numMines = 40
                break;
            }
            case DIFFICULTY.HARD: {
                this._board = this.makeBoard(25);
                this.numMines = 99;
                break;
            }
        }
        this.fillMines(this.numMines, this._board, startNode);
        this.fillHints(this._board);
    }
    get board() {
        return this._board;
    }

    fillHints(board: Array<Array<Tile>>) {
        for (let x = 0; x < board.length; x++) {
            for (let y = 0; y < board.length; y++) {
                if (board[x][y] != BOMB) {
                    let surroundMines = 0;
                    for (let i = -1; i < 2; i++) {
                        for (let j = -1; j < 2; j++) {
                            if (board[x + i] && board[x + i][y + j] != undefined && board[x + i][y + j] == BOMB) {
                                surroundMines++;
                            }
                        }
                    }
                    board[x][y] = surroundMines;
                }

            }
        }
    }
    fillMines(numMines: number, board: Array<Array<Tile>>, startNode: StartNode) {
        let boardLength = board.length;
        let placedMines = 0;
        while (placedMines < numMines) {
            let x = Math.floor(Math.random() * (boardLength));
            let y = Math.floor(Math.random() * (boardLength));
            if (board[x][y] != BOMB && (x != startNode.x && y != startNode.y)) {
                board[x][y] = BOMB;
                placedMines++;
            }
        }
    }
    makeBoard(n: number): Array<Array<Tile>> {
        let array = new Array(n);
        for (let i = 0; i < n; i++) {
            array[i] = new Array(n);
        }
        return array;
    }
}

let BOMB = -1;
type BOMB = -1;
type Tile = BOMB | number;


let game = new Minesweeper(DIFFICULTY.HARD);
console.table(game.board)