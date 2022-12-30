export function updatePlayerPositions(
  board: {
    one: string;
    two: string;
    Three: string;
    four: string;
    five: string;
    six: string;
    seven: string;
    eight: string;
    nine: string;
    Two: string;
    three: string;
  },
  ...args: string[]
) {
  let res = '';
  const playerSymbols = ['X', 'O'];
  args.forEach((id) => {
    switch (id) {
      case 'verticalOne':
        playerSymbols.forEach((symbol) => {
          if (
            board.one === symbol &&
            board.four === symbol &&
            board.seven === symbol
          ) {
            res = 'verticalOne';
          }
        });
        break;

      case 'verticalTwo':
        playerSymbols.forEach((symbol) => {
          if (
            board.two === symbol &&
            board.five === symbol &&
            board.eight === symbol
          ) {
            res = 'verticalTwo';
          }
        });
        break;

      case 'verticalThree':
        playerSymbols.forEach((symbol) => {
          if (
            board.three === symbol &&
            board.six === symbol &&
            board.nine === symbol
          ) {
            res = 'verticalThree';
          }
        });
        break;

      case 'horizontalOne':
        playerSymbols.forEach((symbol) => {
          if (
            board.one === symbol &&
            board.two === symbol &&
            board.three === symbol
          ) {
            res = 'horizontalOne';
          }
        });
        break;

      case 'horizontalTwo':
        playerSymbols.forEach((symbol) => {
          if (
            board.four === symbol &&
            board.five === symbol &&
            board.six === symbol
          ) {
            res = 'horizontalTwo';
          }
        });
        break;

      case 'horizontalThree':
        playerSymbols.forEach((symbol) => {
          if (
            board.seven === symbol &&
            board.eight === symbol &&
            board.nine === symbol
          ) {
            res = 'horizontalThree';
          }
        });
        break;

      case 'diagonalLeftToRight':
        playerSymbols.forEach((symbol) => {
          if (
            board.one === symbol &&
            board.five === symbol &&
            board.nine === symbol
          ) {
            res = 'diagonalLeftToRight';
          }
        });
        break;

      case 'diagonalRightToLeft':
        playerSymbols.forEach((symbol) => {
          if (
            board.seven === symbol &&
            board.five === symbol &&
            board.three === symbol
          ) {
            res = 'diagonalRightToLeft';
          }
        });
        break;
    }
  });
  return res;
}
