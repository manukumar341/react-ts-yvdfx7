import { action, computed } from 'mobx';
import {
  deepEquals,
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
import { updatePlayerPositions } from './updater';

const initialValue = {
  one: '',
  two: '',
  three: '',
  four: '',
  five: '',
  six: '',
  seven: '',
  eight: '',
  nine: '',
};
@model('keystone/example')
class Store extends Model({
  board: tProp(
    types.object(() => ({
      one: types.string,
      two: types.string,
      three: types.string,
      four: types.string,
      five: types.string,
      six: types.string,
      seven: types.string,
      eight: types.string,
      nine: types.string,
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

  @modelAction
  isGameCompleted(id: string) {
    const possibleWinnings = {
      horizontalOne: 0,
      horizontalTwo: 0,
      horizontalThree: 0,
      verticalOne: 0,
      verticalTwo: 0,
      verticalThree: 0,
      diagonalLeftToRight: 0,
      diagonalRightToLeft: 0,
    };
    return updatePlayerPositions({ possibleWinnings, id });
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
    // if (!this.board[key]) {
    // if (!this.isGameCompleted(key)) {
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
      // return true;
    }
    console.log(this.snapshot);
    const currSnap = getSnapshot(this.board);
    console.log(currSnap);
    console.log(deepEquals(this.snapshot, this.snapshot));
    // }
    // }
  }
  @modelAction
  restartGame() {
    this.totalMoves = 0;
    this.board = { ...initialValue };
    this.currentPlayer = 'X';
  }
}

export const store = new Store({
  board: { ...initialValue },
  currentPlayer: 'X',
});
