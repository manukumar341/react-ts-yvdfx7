import { observer } from 'mobx-react';
import React = require('react');
import styled from 'styled-components';
import Boards from './small-board';
import { store } from './store/store';

function Board() {
  const handleOnclickBoard = React.useCallback((e: any) => {
    const id = e.target.id;
    store.updateBord(id);
  }, []);

  const handleRestart = React.useCallback(() => {
    store.restartGame();
  }, []);

  const gameWin = React.useMemo(() => {
    if (store.isGameCompleted) {
      <div>
        <h3>game completed</h3>
        <button onClick={handleRestart}>Restart</button>
      </div>;
    }
  }, [handleRestart]);

  const gameRestart = React.useMemo(() => {
    if (store.totalMoves === 9) {
      <div>
        <h3>restart the game !!</h3>
        <button onClick={handleRestart}>Restart</button>
      </div>;
    }
  }, [handleRestart]);

  const handleUndo = React.useCallback(() => {
    store.undoAction();
  }, []);
  return (
    <div>
      <h1>Player {store.currentPlayer}</h1>
      {store.totalMoves > 0 && (
        <StyledSwitch>
          {gameWin}

          {gameRestart}
        </StyledSwitch>
      )}
      <Boards
        handleOnclickBoard={handleOnclickBoard}
        values={store.board}
        disable={store.isGameCompleted}
      />
    </div>
  );
}
export default observer(Board);

const StyledSwitch = styled.div`
width:400px;
border:1px solid;
margin-left:20%;
`;
