import 'styles/index.less';
import Board from 'js/Board';
import Sudoku from 'js/Sudoku';
import { SUDOKU_ARRAY } from './constants';

main();

function main() {
  let sudoku = new Sudoku(SUDOKU_ARRAY);
  let board = new Board(sudoku);
}
