import 'styles/index.less';
import Board from 'js/Board';
import Game from 'js/Game';

main();

function main() {
  let board = new Board();
  let game = new Game(board);

  game.startGame();
}
