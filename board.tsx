import {
  ActionTrackingResult,
  applyAction,
  fromSnapshot,
  getSnapshot,
  onActionMiddleware,
  onPatches,
  onSnapshot,
  readonlyMiddleware,
  serializeActionCall,
  undoMiddleware,
} from 'mobx-keystone';
import { observer } from 'mobx-react';
import React = require('react');
import styled from 'styled-components';
import Boards from './small-board';
import { store } from './store';

function Board() {
  // const { dispose, allowWrite } = readonlyMiddleware(store);
  const undoManager = undoMiddleware(store.board);
  let patch;
  const snapFun = (curr, pre) => {
    // console.log(curr === pre);

    patch = { ...pre };
  };
  // const onSnap = onSnapshot(store, snapFun);
  onPatches(store, snapFun);
  const disposel = onActionMiddleware(store, {
    onStart(actionCall, actionContext) {
      // const serializableActionCall = serializeActionCall(store, actionCall)
      // console.log(actionContext);
      // return {
      //   result: ActionTrackingResult.Throw,
      //   value: new Error('whatever'),
      // };
      // return {
      //   result: ActionTrackingResult.Return,
      //   value: 42,
      // };
    },
    // onFinish(actionCall, actionContext, ret) {
    //   if (ret.result === ActionTrackingResult.Return) {
    //     console.log(actionContext);
    //     console.log(
    //       'the action succeeded and `ret.value` has the return value'
    //     );
    //   } else if (ret.result === ActionTrackingResult.Throw) {
    //     console.log('// the action threw and `ret.value` has the thrown value');
    //   }
    // },
  });
  console.log(patch);

  const handleOnclickBoard = React.useCallback((e: any) => {
    const id = e.target.id;
    store.updateBord(id);
  }, []);
  const handleRestart = React.useCallback(() => {
    store.restartGame();
  }, []);
  const playerTurns = store.currentPlayer ? (
    <h1>Player: X</h1>
  ) : (
    <h1>Player: O</h1>
  );
  const handleUndo = React.useCallback(() => {
    store.undoAction();
  }, []);
  return (
    <div>
      <StyledSwitch>
        <button onClick={handleUndo}>Undo</button>
      </StyledSwitch>
      <Boards
        handleOnclickBoard={handleOnclickBoard}
        values={store.board}
        disable={store.isGameCompleted ? true : false}
      />
      {store.isGameCompleted && (
        <div>
          <h1>winner {store.isGameCompleted}</h1>
          <button onClick={handleRestart}>Restart</button>
        </div>
      )}
      {store.isGameOver && (
        <div>
          <h1>Game over!!</h1>
          <button onClick={handleRestart}>Restart</button>
        </div>
      )}
    </div>
  );
}
export default observer(Board);

const StyledSwitch = styled.div`
width:400px;
border:1px solid;
margin-left:20%;
`;
