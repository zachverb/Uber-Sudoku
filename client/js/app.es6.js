import 'styles/index.less';
import Board from 'js/Board';
import Sudoku from 'js/Sudoku';

main();

function main() {
  let sudoku = new Sudoku();
  let board = new Board(sudoku);
}
