export function updatePlayerPositions(...args) {
  const playerSymbols = ['X', 'O'];
  args.forEach((id) => {
    switch (id) {
      case 'verticalOne':
        playerSymbols.forEach((symbol) => {
          if (
            this.board.one === symbol &&
            this.board.two === symbol &&
            this.board.Three === symbol
          ) {
            console.log('verticalOne');
            return 'verticalOne';
          }
        });
        break;

      case 'verticalTwo':
        playerSymbols.forEach((symbol) => {
          if (
            this.board.four === symbol &&
            this.board.five === symbol &&
            this.board.six === symbol
          ) {
            console.log('verticalTwo');

            return 'verticalTwo';
          }
        });
        break;

      case 'verticalThree':
        playerSymbols.forEach((symbol) => {
          if (
            this.board.seven === symbol &&
            this.board.eight === symbol &&
            this.board.nine === symbol
          ) {
            console.log('verticalThree');

            return 'verticalThree';
          }
        });
        break;

      case 'horizontalOne':
        playerSymbols.forEach((symbol) => {
          if (
            this.board.one === symbol &&
            this.board.four === symbol &&
            this.board.seven === symbol
          ) {
            console.log('horizontalOne');
            return 'horizontalOne';
          }
        });
        break;

      case 'horizontalTwo':
        playerSymbols.forEach((symbol) => {
          if (
            this.board.Two === symbol &&
            this.board.five === symbol &&
            this.board.eight === symbol
          ) {
            console.log('horizontalTwo');
            return 'horizontalTwo';
          }
        });
        break;

      case 'horizontalThree':
        playerSymbols.forEach((symbol) => {
          if (
            this.board.Three === symbol &&
            this.board.six === symbol &&
            this.board.nine === symbol
          ) {
            console.log('horizontalThree');
            return 'horizontalThree';
          }
        });
        break;

      case 'diagonalLeftToRight':
        playerSymbols.forEach((symbol) => {
          if (
            this.board.one === symbol &&
            this.board.five === symbol &&
            this.board.nine === symbol
          ) {
            console.log('diagonalLeftToRight');
            return 'diagonalLeftToRight';
          }
        });
        break;

      case 'diagonalRightToLeft':
        playerSymbols.forEach((symbol) => {
          if (
            this.board.seven === symbol &&
            this.board.five === symbol &&
            this.board.three === symbol
          ) {
            console.log('diagonalRightToLeft');
            return 'diagonalRightToLeft';
          }
        });
        break;
    }
  });
}
