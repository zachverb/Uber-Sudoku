export default class Sudoku {
  constructor(sudokuArray) {
    this.sudokuArray = sudokuArray;
  }

  addMove(value, row, column) {
    if(!isNaN(value) && this.isValid(value, row, column)) {
      this.sudokuArray[row][column] = value;
      return true;
    }
    return false;
  } 

  isValid(value, row, column) {
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
        if (this.sudokuArray[i][j] === value) {
          return false;
        }
      }
    }

    return true;
  }

  isGameOver() {
    this.sudokuArray.forEach((row, rowIndex) => {
      row.forEach((value, columnIndex) => {
        if(!this.isValid(value, rowIndex, columnIndex)) {
          return false;
        }
      });
    });

    return true;
  }

}
