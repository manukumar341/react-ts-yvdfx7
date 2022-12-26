import { observer } from 'mobx-react';
import React = require('react');
import Boards from './small-board';
import { store } from './store';

function Board() {
  console.log(store);
  const handleOnclickBoard = React.useCallback((e: any) => {
    const id = e.target.id;
    store.updateBord(id);
  }, []);
  const handleRestart = React.useCallback(() => {
    store.restartGame();
  }, []);
  const playerTurns = store.isFirstPlayer ? (
    <h1>Player: X</h1>
  ) : (
    <h1>Player: O</h1>
  );
  return (
    <div>
      <Boards
        handleOnclickBoard={handleOnclickBoard}
        values={store.board}
        disable={store.isGameCompleted ? true : false}
      />
      {store.isGameCompleted ? (
        <div>
          <h1>Player {store.isGameCompleted}</h1>
          <button onClick={handleRestart}>Restart</button>
        </div>
      ) : (
        playerTurns
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
