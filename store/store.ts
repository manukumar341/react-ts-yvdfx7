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
  types,
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
    // console.log(id);
    switch (id) {
      case 'one':
        this.isGameCompleted = updatePlayerPositions(
          this.board,
          'horizontalOne',
          'verticalOne',
          'diagonalLeftToRight'
        );
        // console.log(this.isGameCompleted ? 'Y' : 'N');
        break;
      case 'two':
        this.isGameCompleted = updatePlayerPositions(
          this.board,
          'horizontalOne',
          'verticalTwo'
        );
        // console.log(this.isGameCompleted ? 'Y' : 'N');
        break;
      case 'three':
        this.isGameCompleted = updatePlayerPositions(
          this.board,
          'horizontalOne',
          'verticalThree',
          'diagonalRightToLeft'
        );
        // console.log(this.isGameCompleted ? 'Y' : 'N');
        break;
      case 'four':
        this.isGameCompleted = updatePlayerPositions(
          this.board,
          'horizontalTwo',
          'verticalOne'
        );
        // console.log(this.isGameCompleted ? 'Y' : 'N');
        break;
      case 'five':
        this.isGameCompleted = updatePlayerPositions(
          this.board,
          'diagonalLeftToRight',
          'diagonalRightToLeft',
          'horizontalTwo',
          'verticalTwo'
        );
        // console.log(this.isGameCompleted ? 'Y' : 'N');
        break;
      case 'six':
        this.isGameCompleted = updatePlayerPositions(
          this.board,
          'horizontalTwo',
          'verticalThree'
        );
        // console.log(this.isGameCompleted ? 'Y' : 'N');
        break;
      case 'seven':
        this.isGameCompleted = updatePlayerPositions(
          this.board,
          'horizontalThree',
          'verticalOne',
          'diagonalRightToLeft'
        );
        // console.log(this.isGameCompleted ? 'Y' : 'N');
        break;
      case 'eight':
        this.isGameCompleted = updatePlayerPositions(
          this.board,
          'horizontalThree',
          'verticalTwo'
        );
        // console.log(this.isGameCompleted ? 'Y' : 'N');
        break;
      case 'nine':
        this.isGameCompleted = updatePlayerPositions(
          this.board,
          'horizontalThree',
          'verticalThree',
          'diagonalLeftToRight'
        );
        // console.log(this.isGameCompleted ? 'Y' : 'N');
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
    // console.log(key);
    if (!this.board[key] && !this.isGameCompleted) {
      this.snapshot = getSnapshot(this.board);
      this.board[key] = this.currentPlayer;
      this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
      this.totalMoves += 1;
      this.updatePossition(key);
    }
  }
  @modelAction
  restartGame() {
    this.totalMoves = 0;
    this.board = { ...initialValue };
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
