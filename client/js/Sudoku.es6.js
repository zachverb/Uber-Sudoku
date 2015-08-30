import { List } from 'immutable';

export default class Sudoku {
  constructor(sudokuArray) {
    this.sudokuArray = sudokuArray;
  }

  addMove(value, row, column) {
    if(this.isValid(value, row, column)) {
      this.sudokuArray[row][column] = value;
      return true;
    }
    return false;
  }

  removeMove(row, column) {
    this.sudokuArray[row][column] = '';
  }

  isValid(value, row, column) {
    if(value === '') {
      return false;
    }

    for(let i = 0; i < 9; i++) {
      if (this.sudokuArray[row][i] === value) {
        return false;
      }
    }

    for(let i = 0; i < 9; i++) {
      if (this.sudokuArray[i][column] === value) {
        return false;
      }
    }

    let cellRow = Math.floor(row / 3);
    let cellColumn = Math.floor(column / 3);

    for(let i = cellRow; i < cellRow + 3; i++) {
      for(let j = cellColumn; j < cellColumn + 3; j++) {
        console.log(i, j);
        if (this.sudokuArray[i][j] === value) {
          return false;
        }
      }
    }

    return true;
  }

  isGameOver() {
    let checkArray = List([1, 2, 3, 4, 5, 6, 7, 8, 9]);

    // check all rows horizontally
    for(let i = 0; i < 9; i++) {
      let checkVertical = checkArray;
      let checkHorizontal = checkArray;

      for(let j = 0; j < 9; j++) {
        let vertical = this.sudokuArray[j][i];
        let horizontal = this.sudokuArray[i][j];
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
            let value = this.sudokuArray[i][j];
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

}
