import { computed } from 'mobx';
import {
  fromSnapshot,
  getSnapshot,
  model,
  Model,
  modelAction,
  prop,
  tProp,
  transaction,
  transactionMiddleware,
  types,
  undoMiddleware,
} from 'mobx-keystone';
interface IStore {
  a1: 'X' | 'O' | undefined;
  b1: 'X' | 'O' | undefined;
  c1: 'X' | 'O' | undefined;
  a2: 'X' | 'O' | undefined;
  b2: 'X' | 'O' | undefined;
  c2: 'X' | 'O' | undefined;
  a3: 'X' | 'O' | undefined;
  b3: 'X' | 'O' | undefined;
  c3: 'X' | 'O' | undefined;
}

@model('keystone/example')
class Store extends Model({
  board: tProp(
    types.object(() => ({
      a1: types.string,
      b1: types.string,
      c1: types.string,
      a2: types.string,
      b2: types.string,
      c2: types.string,
      a3: types.string,
      b3: types.string,
      c3: types.string,
    }))
  ),
  currentPlayer: tProp(types.string),
  totalMoves: tProp(0),
  snapshot: prop(Object),
}) {
  @computed
  get isGameOver() {
    return this.totalMoves === 9;
  }

  @computed
  get isGameCompleted() {
    const board = this.board;
    if (
      (board.a1 === 'X' && board.b1 === 'X' && board.c1 === 'X') ||
      (board.a1 === 'O' && board.b1 === 'O' && board.c1 === 'O')
    ) {
      return board.a1;
    } else if (
      (board.a2 === 'X' && board.b2 === 'X' && board.c2 === 'X') ||
      (board.a2 === 'O' && board.b2 === 'O' && board.c2 === 'O')
    ) {
      return board.a2;
    } else if (
      (board.a3 === 'X' && board.b3 === 'X' && board.c3 === 'X') ||
      (board.a3 === 'O' && board.b3 === 'O' && board.c3 === 'O')
    ) {
      return board.a3;
    } else if (
      (board.a1 === 'X' && board.a2 === 'X' && board.a3 === 'X') ||
      (board.a1 === 'O' && board.a2 === 'O' && board.a3 === 'O')
    ) {
      return board.a1;
    } else if (
      (board.b1 === 'X' && board.b2 === 'X' && board.b3 === 'X') ||
      (board.b1 === 'O' && board.b2 === 'O' && board.b3 === 'O')
    ) {
      return board.b1;
    } else if (
      (board.c1 === 'X' && board.c2 === 'X' && board.c3 === 'X') ||
      (board.c1 === 'O' && board.c2 === 'O' && board.c3 === 'O')
    ) {
      return board.c1;
    } else if (
      (board.a1 === 'X' && board.b2 === 'X' && board.c3 === 'X') ||
      (board.a1 === 'O' && board.b2 === 'O' && board.c3 === 'O')
    ) {
      return board.a1;
    } else if (
      (board.c1 === 'X' && board.b2 === 'X' && board.a3 === 'X') ||
      (board.c1 === 'O' && board.b2 === 'O' && board.a3 === 'O')
    ) {
      return board.c1;
    }
  }
  @modelAction
  undoAction() {
    if (this.board !== fromSnapshot(this.snapshot)) {
      if (this.snapshot !== {}) {
        this.board = fromSnapshot(this.snapshot);
        this.snapshot = getSnapshot(this.board);
        this.currentPlayer === 'X'
          ? (this.currentPlayer = 'O')
          : (this.currentPlayer = 'X');
      }
    }
  }
  @transaction
  @modelAction
  updateBord(key: string) {
    if (!this.board[key]) {
      if (!this.isGameCompleted) {
        if (this.currentPlayer === 'O') {
          this.snapshot = getSnapshot(this.board);
          this.board[key] = this.currentPlayer;
          this.currentPlayer = 'X';
          this.totalMoves += 1;
          // throw new Error('manjunath');
        } else {
          this.snapshot = getSnapshot(this.board);
          this.board[key] = this.currentPlayer;
          this.currentPlayer = 'O';
          this.totalMoves += 1;
          return true;
        }
      }
    }
  }
  @modelAction
  restartGame() {
    this.totalMoves = 0;
    this.board = {
      a1: '',
      b1: '',
      c1: '',
      a2: '',
      b2: '',
      c2: '',
      a3: '',
      b3: '',
      c3: '',
    };
    this.currentPlayer = 'X';
  }
}

export const store = new Store({
  board: {
    a1: '',
    b1: '',
    c1: '',
    a2: '',
    b2: '',
    c2: '',
    a3: '',
    b3: '',
    c3: '',
  },
  currentPlayer: 'X',
});

const undoManager = undoMiddleware(store.board);
transactionMiddleware({
  model: store,
  actionName: 'updateBord',
});
