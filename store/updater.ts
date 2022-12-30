interface Ipositions {
  horizontalThree?: number;
  verticalThree?: number;
  verticalTwo?: number;
  verticalOne?: number;
  horizontalOne?: number;
  diagonalLeftToRight?: number;
  diagonalRightToLeft?: number;
}










export function updatePlayerPositions({
  possibleWinnings,
  id,
}: {
  possibleWinnings: Ipositions;
  id: string;
}) {
  switch (id) {
    case 'one':
      possibleWinnings.horizontalOne += 1;
      possibleWinnings.verticalOne += 1;
      possibleWinnings.diagonalLeftToRight += 1;
      break;
    case 'two':
      possibleWinnings.horizontalOne += 1;
      possibleWinnings.verticalTwo += 1;
      break;
    case 'three':
      possibleWinnings.horizontalOne += 1;
      possibleWinnings.verticalThree += 1;
      possibleWinnings.diagonalRightToLeft += 1;
      break;
    case 'four':
      possibleWinnings.horizontalOne += 1;
      possibleWinnings.verticalOne += 1;
      break;
    case 'five':
      possibleWinnings.diagonalLeftToRight += 1;
      possibleWinnings.diagonalRightToLeft += 1;
      possibleWinnings.horizontalOne += 1;
      possibleWinnings.verticalTwo += 1;
      break;
    case 'six':
      possibleWinnings.horizontalOne += 1;
      possibleWinnings.verticalThree += 1;
      break;
    case 'seven':
      possibleWinnings.horizontalOne += 1;
      possibleWinnings.verticalOne += 1;
      possibleWinnings.diagonalRightToLeft += 1;
      break;
    case 'eight':
      possibleWinnings.horizontalOne += 1;
      possibleWinnings.verticalTwo += 1;
      break;
    case 'nine':
      possibleWinnings.horizontalThree += 1;
      possibleWinnings.verticalThree += 1;
      possibleWinnings.diagonalLeftToRight += 1;
      break;
  }
  return matchWin(possibleWinnings);
}

function matchWin(args: Ipositions) {
  for (let key in args) {
    if (args[key] === 3) {
      return true;
    }
  }
}
