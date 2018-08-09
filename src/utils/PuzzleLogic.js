class Puzzle {
	constructor(dimension) {
		this.dimension = dimension;
		this.board = [];
		this.path = [];
		this.lastMove = null;
		this.Direction = {
			LEFT: "left",
			RIGHT: "right",
			UP: "up",
			DOWN: "down"
		};
		this.buildBoard();
	}

	buildBoard() {
		for (let i = 0; i < this.dimension; i++) {
			this.board.push([]);
			for (let j = 0; j < this.dimension; j++) {
				if (i === this.dimension - 1 && j === this.dimension - 1) {
					this.board[i].push(0);
				} else {
					this.board[i].push(this.dimension * i + j + 1);
				}
			}
		}
	}

	// Get the (x, y) position of the blank space
	getBlankSpace() {
		for (let i = 0; i < this.dimension; i++) {
			for (let j = 0; j < this.dimension; j++) {
				if (this.board[i][j] === 0) return [i, j];
			}
		}
	}

	// Swap two items on a bidimensional array
	swap(i1, j1, i2, j2) {
		const temp = this.board[i1][j1];
		this.board[i1][j1] = this.board[i2][j2];
		this.board[i2][j2] = temp;
	}

	// Return the Direction that a piece can be moved, if any
	getMove(piece) {
		const blankSpacePosition = this.getBlankSpace();
		const line = blankSpacePosition[0];
		const column = blankSpacePosition[1];
		const { DOWN, UP, RIGHT, LEFT } = this.Direction;

		if (line > 0 && piece === this.board[line - 1][column]) {
			return DOWN;
		} else if (line < this.dimension - 1 && piece === this.board[line + 1][column]) {
			return UP;
		} else if (column > 0 && piece === this.board[line][column - 1]) {
			return RIGHT;
		} else if (column < this.dimension - 1 && piece === this.board[line][column + 1]) {
			return LEFT;
		}
	}

	// Return all current allowed moves
	getAllowedMoves() {
		const allowedMoves = [];
		for (let i = 0; i < this.dimension; i++) {
			for (let j = 0; j < this.dimension; j++) {
				const piece = this.board[i][j];
				if (!!this.getMove(piece)) {
					allowedMoves.push(piece);
				}
			}
		}
		return allowedMoves;
	};

	// Move a piece, if possible, and return the Direction that it was moved
	move(piece) {
		const move = this.getMove(piece);
		if (!!move) {
			const blankSpacePosition = this.getBlankSpace();
			const line = blankSpacePosition[0];
			const column = blankSpacePosition[1];
			const { DOWN, UP, RIGHT, LEFT } = this.Direction;

			switch (move) {
				case LEFT:
					this.swap(line, column, line, column + 1);
					break;
				case RIGHT:
					this.swap(line, column, line, column - 1);
					break;
				case UP:
					this.swap(line, column, line + 1, column);
					break;
				case DOWN:
					this.swap(line, column, line - 1, column);
					break;
				default:
					break;
			}
			this.lastMove = piece;
			return move;
		}
	}

	isGoalState() {
		for (let i = 0; i < this.dimension; i++) {
			for (let j = 0; j < this.dimension; j++) {
				const piece = this.board[i][j];
				if (piece !== 0) {
					const originalLine = Math.floor((piece - 1) / this.dimension);
					const originalColumn = (piece - 1) % this.dimension;
					if (i !== originalLine || j !== originalColumn) return false;
				}
			}
		}
		return true;
	}
}

export default (size) => new Puzzle(size);
