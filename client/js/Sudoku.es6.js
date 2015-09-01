import { fromJS, List } from 'immutable';
import { SUDOKU_ARRAY } from './constants';

export default class Sudoku {
  constructor() {
    this.start();
  }

  getIndex(row, column) {
    return this.sudokuArray.get(row).get(column);
  }

  setIndex(value, row, column) {
    this.sudokuArray = this.sudokuArray.setIn([row, column], value);
  }

  /*
   * Checks for invalid locations of
   */
  findConflicts(value, row, column) {

    if(value === '') {
      return false;
    }

    let conflicts = new List();

    for(let i = 0; i < 9; i++) {
      if (this.getIndex(row, i) === value) {
        conflicts = conflicts.push({
          row,
          column: i
        });
      }
    }

    for(let i = 0; i < 9; i++) {
      if (this.getIndex(i, column) === value) {
        conflicts = conflicts.push({
          row: i,
          column
        });
      }
    }

    let cellRow = row - (row % 3);
    let cellColumn = column - (column % 3);

    for(let i = cellRow; i < cellRow + 3; i++) {
      for(let j = cellColumn; j < cellColumn + 3; j++) {
        if (this.getIndex(i, j) === value) {
          conflicts = conflicts.push({
            row: i,
            column: j
          });
        }
      }
    }

    console.log(fromJS(conflicts));
    return conflicts;
  }

  isGameOver() {
    let checkArray = List([1, 2, 3, 4, 5, 6, 7, 8, 9]);

    // check all rows horizontally
    for(let i = 0; i < 9; i++) {
      let checkVertical = checkArray;
      let checkHorizontal = checkArray;

      for(let j = 0; j < 9; j++) {
        let vertical = this.getIndex(j, i);
        let horizontal = this.getIndex(i, j);
        let verticalIndex = checkVertical.indexOf(vertical);
        let horizontalIndex = checkHorizontal.indexOf(horizontal);
        if(verticalIndex < 0 || horizontalIndex < 0) {
          return false;
        }
        checkVertical = checkVertical.remove(verticalIndex);
        checkHorizontal = checkHorizontal.remove(horizontalIndex);
      }
    }

    for(let row = 0; row < 9; row+=3) {
      for (let column = 0; column < 9; column += 3) {
        let checkCell = checkArray;
        for(let i = row; i < row + 3; i++) {
          for(let j = column; j < column + 3; j++) {
            let value = this.getIndex(i, j);
            let index = checkCell.indexOf(value);
            if(index < 0) {
              return false;
            }
            checkCell = checkCell.remove(index);
          }
        }
      }
    }
    return true;
  }

  start() {
    this.sudokuArray = fromJS(SUDOKU_ARRAY);
  }

}
