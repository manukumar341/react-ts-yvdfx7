import { action, computed } from 'mobx';
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

  updatePlayerPosition(id: string) {
    const myPositions = {
      one: 0,
      second: 0,
      three: 0,
      a: 0,
      b: 0,
      c: 0,
      leftToRight: 0,
      rightToLeft: 0,
    };
    switch (id) {
      case 'a1':
        myPositions.one += 1;
        myPositions.a += 1;
        myPositions.leftToRight += 1;
        break;
      case 'a2':
        myPositions.a += 1;
        myPositions.second += 1;
        break;
      case 'a3':
        myPositions.three += 1;
        myPositions.a += 1;
        myPositions.rightToLeft += 1;
        break;
      case 'b1':
        myPositions.one += 1;
        myPositions.b += 1;
        break;
      case 'b2':
        myPositions.leftToRight += 1;
        myPositions.rightToLeft += 1;
        myPositions.second += 1;
        myPositions.b += 1;
        break;
      case 'b3':
        myPositions.three += 1;
        myPositions.b += 1;
        break;
      case 'c1':
        myPositions.c += 1;
        myPositions.one += 1;
        myPositions.rightToLeft += 1;
        break;
      case 'c2':
        myPositions.c += 1;
        myPositions.second += 1;
        break;
      case 'c3':
        myPositions.c += 1;
        myPositions.three += 1;
        myPositions.leftToRight += 1;
        break;
    }
  }

  isXWin(id: string) {
    const myPositions = {
      one: 0,
      second: 0,
      three: 0,
      a: 0,
      b: 0,
      c: 0,
      leftToRight: 0,
      rightToLeft: 0,
    };
  }
  isOWin() {}

  @modelAction
  isGameCompleted(id: string) {}
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
