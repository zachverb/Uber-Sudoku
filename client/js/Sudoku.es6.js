import { fromJS, List } from 'immutable';
import { SUDOKU_ARRAY } from './constants.es6.js';

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

  findConflicts() {
    let checkArray = List([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    let conflicts = new List();

    let checkLocation = (row, column, list) => {
      let value = this.getIndex(row, column);
      let index = list.indexOf(value);

      if(value === '') {
        return list;
      }

      if (list.indexOf(value) < 0) {
        console.log('value I search for..', value, "should be ", index);
        console.log(fromJS(list), value);
        console.log(value, row, column);
        conflicts = conflicts.push({
          row,
          column
        });
        return list;
      };

      return list.remove(index);
    }

    // check all rows horizontally
    for(let i = 0; i < 9; i++) {
      let checkVertical = checkArray;
      let checkHorizontal = checkArray;

      for(let j = 0; j < 9; j++) {
        console.log("VERTICAL");
        checkVertical = checkLocation(j, i, checkVertical);
        console.log("HORIZONTAL");
        checkHorizontal = checkLocation(i, j, checkHorizontal);
      }
    }

    for(let row = 0; row < 9; row+=3) {
      for (let column = 0; column < 9; column += 3) {
        let checkCell = checkArray;
        console.log("CELL");
        for(let i = row; i < row + 3; i++) {
          for(let j = column; j < column + 3; j++) {
            checkCell = checkLocation(i, j, checkCell);
          }
        }
      }
    }

    console.log(fromJS(conflicts));
    return conflicts;
  }

  isCompleted() {
    for(let row = 0; row < 9; row++) {
      for(let column = 0; column < 9; column++) {
        if(getIndex(row, column) === '') {
          return false;
        }
      }
    }
    return true;
  }

  start() {
    this.sudokuArray = fromJS(SUDOKU_ARRAY);
  }

}
