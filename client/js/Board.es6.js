import { fromJS, List } from 'immutable';

/**
 * The board class manipulates and holds the data layer.
 * Uses an Immutable List to hold board's state.
 */
export default class Board {
  /**
   * @param {array} - translates array into Immutable List and uses it
   *                  as the Board's state.
   */
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
   * @param { number } value - The Sudoku number value for the tile.
   * @param { number } row - The index of the outer sudoku array
   * @param { number } column - The index of the inner sudoku array
   *
   * Checks for conflicting values by checking the conflicts in the row,
   * column, and cell. Returns an Immutable list of the aggregated conflicts.
   */
  findConflicts(value, row, column) {
    let conflicts = new List();

    // check all values in the same row
    for(let i = 0; i < 9; i++) {
      if (this.getIndex(row, i) === value && i !== column) {
        conflicts = conflicts.push({
          row,
          column: i
        });
      }
    }

    // check all values in the same column
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

    // check all values in the cell
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

  /*
   * @param { number } row - The index of the outer sudoku array
   * @param { number } column - The index of the inner sudoku array
   * @param { List } list - the current list of unused values
   * @returns { List } - null if unsolved, otherwise list without the value
   */
  checkLocation(row, column, list) {
    let value = this.getIndex(row, column);
    let index = list.indexOf(value);

    if(value === '' || index < 0) {
      return null;
    }

    return list.remove(index);
  }

  /**
   * Creates a list of the unused values for a given row, column, or cell.
   * Goes through the current board and checks each location.
   * Will remove the values from the list as they are found. If the index
   * returns -1, the puzzle is not solved.
   * @returns { boolean }
   */
  isSolved() {
    let checkArray = List([1, 2, 3, 4, 5, 6, 7, 8, 9]);

    // check all rows and columns
    for(let i = 0; i < 9; i++) {
      let checkColumn = checkArray;
      let checkRow = checkArray;

      for(let j = 0; j < 9; j++) {
        checkColumn = this.checkLocation(j, i, checkColumn);
        checkRow = this.checkLocation(i, j, checkRow);
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
            checkCell = this.checkLocation(i, j, checkCell);
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
