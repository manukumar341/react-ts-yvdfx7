import { computed } from 'mobx';
import {
  computedTree,
  model,
  Model,
  modelAction,
  tProp,
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
  isFirstPlayer: tProp(true),
  totalMoves: tProp(0),
}) {
  // onInit() {
  //   const a = transactionMiddleware({
  //     model: this,
  //     actionName: 'dummyAction',
  //   });
  // }
  // @modelAction
  // dummyAction() {
  //   try {
  //     let a = 6 / 0;
  //   } catch {
  //     throw new Error('sjdfl');
  //   }
  // }

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
  updateBord(key: string) {
    if (!this.board[key]) {
      if (!this.isGameCompleted) {
        if (this.isFirstPlayer) {
          this.board[key] = 'X';
          this.isFirstPlayer = false;
          this.totalMoves += 1;
        } else {
          this.board[key] = 'O';
          this.isFirstPlayer = true;
          this.totalMoves += 1;
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
});
export function createInstance() {
  const store = new Store({
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
  });
  return store;
}
