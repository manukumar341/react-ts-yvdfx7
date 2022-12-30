import { action, computed } from 'mobx';
import {
  applySet,
  fromSnapshot,
  getSnapshot,
  model,
  Model,
  modelAction,
  prop,
  tProp,
  transaction,
  types,
} from 'mobx-keystone';
import { updatePlayerPossition } from './updater';

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
  isGameCompleted: tProp(types.string, ''),
  totalMoves: tProp(0),
  snapshot: prop(Object),
}) {
  @computed
  get isGameOver() {
    return this.totalMoves === 9;
  }

  @modelAction
  updatePossition(id: string) {
    switch (id) {
      case 'one':
        this.isGameCompleted = updatePlayerPossition(
          this.board,
          'horizontalOne',
          'verticalOne',
          'diagonalLeftToRight'
        );

        break;
      case 'two':
        this.isGameCompleted = updatePlayerPossition(
          this.board,
          'horizontalOne',
          'verticalTwo'
        );

        break;
      case 'three':
        this.isGameCompleted = updatePlayerPossition(
          this.board,
          'horizontalOne',
          'verticalThree',
          'diagonalRightToLeft'
        );

        break;
      case 'four':
        this.isGameCompleted = updatePlayerPossition(
          this.board,
          'horizontalTwo',
          'verticalOne'
        );

        break;
      case 'five':
        this.isGameCompleted = updatePlayerPossition(
          this.board,
          'diagonalLeftToRight',
          'diagonalRightToLeft',
          'horizontalTwo',
          'verticalTwo'
        );

        break;
      case 'six':
        this.isGameCompleted = updatePlayerPossition(
          this.board,
          'horizontalTwo',
          'verticalThree'
        );

        break;
      case 'seven':
        this.isGameCompleted = updatePlayerPossition(
          this.board,
          'horizontalThree',
          'verticalOne',
          'diagonalRightToLeft'
        );

        break;
      case 'eight':
        this.isGameCompleted = updatePlayerPossition(
          this.board,
          'horizontalThree',
          'verticalTwo'
        );

        break;
      case 'nine':
        this.isGameCompleted = updatePlayerPossition(
          this.board,
          'horizontalThree',
          'verticalThree',
          'diagonalLeftToRight'
        );

        break;
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

  @modelAction
  updateBord(key: string) {
    if (!this.board[key] && !this.isGameCompleted) {
      this.snapshot = getSnapshot(this.board);
      applySet(this.board, key, this.currentPlayer);
      this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
      this.totalMoves += 1;
      this.updatePossition(key);
      console.log(this.board);
    }
  }

  @modelAction
  restartGame() {
    this.totalMoves = 0;
    this.board = { ...initialValue };
    applySet(this.board, initialValue);
    this.currentPlayer = 'X';
    this.isGameCompleted = '';
  }
}

export const store = new Store({
  board: {
    one: '',
    two: '',
    three: '',
    four: '',
    five: '',
    six: '',
    seven: '',
    eight: '',
    nine: '',
  },
  currentPlayer: 'X',
});
