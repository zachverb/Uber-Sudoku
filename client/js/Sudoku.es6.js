import { fromJS, List } from 'immutable';

export default class Sudoku {
  constructor(array) {
    this.sudokuArray = fromJS(array);
  }

  getIndex(row, column) {
    return this.sudokuArray.get(row).get(column);
  }

  setIndex(value, row, column) {
    this.sudokuArray = this.sudokuArray.setIn([row, column], value);
  }

  /*
   * @param {number} value - The Sudoku number value for the tile.
   * @param {number} row - The index of the outer sudoku array
   * @param {number} column - The index of the inner sudoku array
   *
   * Checks for conflicting values by checking the conflicts in the row,
   * column, and cell. Returns an Immutable list of the aggregated conflicts.
   */
  findConflicts(value, row, column) {
    let conflicts = new List();

    for(let i = 0; i < 9; i++) {
      if (this.getIndex(row, i) === value && i !== column) {
        conflicts = conflicts.push({
          row,
          column: i
        });
      }
    }

    for(let i = 0; i < 9; i++) {
      if (this.getIndex(i, column) === value && i !== row) {
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
        if (this.getIndex(i, j) === value && i !== row && j != column) {
          conflicts = conflicts.push({
            row: i,
            column: j
          });
        }
      }
    }

    return conflicts;
  }

  /**
   * Goes through the current board and checks to see if
   * each row, column, and cell has the numbers 1-9 only occur once.
   * Returns false if it fails.
   */
  isGameOver() {
    let checkArray = List([1, 2, 3, 4, 5, 6, 7, 8, 9]);

    let checkLocation = (row, column, list) => {
      let value = this.getIndex(row, column);
      let index = list.indexOf(value);

      if(value === '' || index < 0) {
        return false;
      }

      return list.remove(index);
    };

    // check all rows and columns
    for(let i = 0; i < 9; i++) {
      let checkColumn = checkArray;
      let checkRow = checkArray;

      for(let j = 0; j < 9; j++) {
        checkColumn = checkLocation(j, i, checkColumn);
        checkRow = checkLocation(i, j, checkRow);
        if(!checkColumn || !checkRow) {
          return false;
        }
      }
    }

    // check all cells
    for(let row = 0; row < 9; row+=3) {
      for (let column = 0; column < 9; column += 3) {
        let checkCell = checkArray;
        for(let i = row; i < row + 3; i++) {
          for(let j = column; j < column + 3; j++) {
            checkCell = checkLocation(i, j, checkCell);
            if(!checkCell) {
              return false;
            }
          }
        }
      }
    }

    return true;
  }
}
