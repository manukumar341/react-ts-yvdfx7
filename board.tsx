import { observer } from 'mobx-react';
import React = require('react');
import styled from 'styled-components';
import Boards from './small-board';
import { store } from './store/store';

function Board() {
  store.isGameCompleted && console.log(store.isGameCompleted);
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
      {store.totalMoves > 0 && (
        <StyledSwitch>
          {store.isGameCompleted ? (
            <button onClick={handleRestart}>Restart</button>
          ) : (
            <button onClick={handleUndo}>Undo</button>
          )}
        </StyledSwitch>
      )}
      <Boards
        handleOnclickBoard={handleOnclickBoard}
        values={store.board}
        disable={store.isGameCompleted}
      />
      {store.isGameCompleted && (
        <div>{/* <h1>winner {store.isGameCompleted()}</h1> */}</div>
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
