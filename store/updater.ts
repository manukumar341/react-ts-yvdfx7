interface Ipositions {
  horizontalThree?: { X: number; O: number };
  verticalThree?: { X: number; O: number };
  verticalTwo?: { X: number; O: number };
  verticalOne?: { X: number; O: number };
  horizontalOne?: { X: number; O: number };
  diagonalLeftToRight?: { X: number; O: number };
  diagonalRightToLeft?: { X: number; O: number };
}

const possibleWinnings = {
  horizontalOne: { X: 0, O: 0 },
  horizontalTwo: { X: 0, O: 0 },
  horizontalThree: { X: 0, O: 0 },
  verticalOne: { X: 0, O: 0 },
  verticalTwo: { X: 0, O: 0 },
  verticalThree: { X: 0, O: 0 },
  diagonalLeftToRight: { X: 0, O: 0 },
  diagonalRightToLeft: { X: 0, O: 0 },
};
export function updatePlayerPositions({
  id,
  currentPlayer,
}: {
  id: string;
  currentPlayer: string;
}) {
  switch (id) {
    case 'one':
      possibleWinnings.horizontalOne[currentPlayer] += 1;
      possibleWinnings.verticalOne[currentPlayer] += 1;
      possibleWinnings.diagonalLeftToRight[currentPlayer] += 1;
      break;
    case 'two':
      possibleWinnings.horizontalOne[currentPlayer] += 1;
      possibleWinnings.verticalTwo[currentPlayer] += 1;
      break;
    case 'three':
      possibleWinnings.horizontalOne[currentPlayer] += 1;
      possibleWinnings.verticalThree[currentPlayer] += 1;
      possibleWinnings.diagonalRightToLeft[currentPlayer] += 1;
      break;
    case 'four':
      possibleWinnings.horizontalOne[currentPlayer] += 1;
      possibleWinnings.verticalOne[currentPlayer] += 1;
      break;
    case 'five':
      possibleWinnings.diagonalLeftToRight[currentPlayer] += 1;
      possibleWinnings.diagonalRightToLeft[currentPlayer] += 1;
      possibleWinnings.horizontalOne[currentPlayer] += 1;
      possibleWinnings.verticalTwo[currentPlayer] += 1;
      break;
    case 'six':
      possibleWinnings.horizontalOne[currentPlayer] += 1;
      possibleWinnings.verticalThree[currentPlayer] += 1;
      break;
    case 'seven':
      possibleWinnings.horizontalOne[currentPlayer] += 1;
      possibleWinnings.verticalOne[currentPlayer] += 1;
      possibleWinnings.diagonalRightToLeft[currentPlayer] += 1;
      break;
    case 'eight':
      possibleWinnings.horizontalOne[currentPlayer] += 1;
      possibleWinnings.verticalTwo[currentPlayer] += 1;
      break;
    case 'nine':
      possibleWinnings.horizontalThree[currentPlayer] += 1;
      possibleWinnings.verticalThree[currentPlayer] += 1;
      possibleWinnings.diagonalLeftToRight[currentPlayer] += 1;
      break;
  }
  return matchWin(possibleWinnings);
}

function matchWin(args: Ipositions) {
  console.log(args);
  for (let key in args) {
    if (args[key].X === 3) {
      return true;
    }
    if (args[key].O === 3) {
      return true;
    }
  }
}
