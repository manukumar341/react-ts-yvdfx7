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
interface Ipositions {
  horizontalThree?: { X: number; O: number };
  verticalThree?: { X: number; O: number };
  verticalTwo?: { X: number; O: number };
  verticalOne?: { X: number; O: number };
  horizontalOne?: { X: number; O: number };
  diagonalLeftToRight?: { X: number; O: number };
  diagonalRightToLeft?: { X: number; O: number };
}

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
  isGameCompleted: tProp(types.boolean, false),
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
        updatePlayerPositions(
          'horizontalOne',
          'verticalOne',
          'diagonalLeftToRight'
        );
        break;
      case 'two':
        updatePlayerPositions('horizontalOne', 'verticalTwo');
        break;
      case 'three':
        updatePlayerPositions(
          'horizontalOne',
          'verticalThree',
          'diagonalRightToLeft'
        );
        break;
      case 'four':
        updatePlayerPositions('horizontalOne', 'verticalOne');
        break;
      case 'five':
        updatePlayerPositions(
          'diagonalLeftToRight',
          'diagonalRightToLeft',
          'horizontalOne',
          'verticalTwo'
        );
        break;
      case 'six':
        updatePlayerPositions('horizontalOne', 'verticalThree');
        break;
      case 'seven':
        updatePlayerPositions(
          'horizontalOne',
          'verticalOne',
          'diagonalRightToLeft'
        );
        break;
      case 'eight':
        updatePlayerPositions('horizontalOne', 'verticalTwo');
        break;
      case 'nine':
        updatePlayerPositions(
          'horizontalThree',
          'verticalThree',
          'diagonalLeftToRight'
        );
        break;
    }
    return;
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
    if (!this.board[key]) {
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
