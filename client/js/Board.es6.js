import $ from 'jquery';
import Sudoku from 'js/Sudoku';

export default class Board {
  constructor() {
    this.sudoku = new Sudoku();
    $('#sudoku-container')
      .append(this.generateBoard(this.sudoku.sudokuArray));
  }

  generateBoard(sudokuArray) {
    let board = $('<table></table>');

    sudokuArray.forEach((row, y) => {
      let rowElement = $('<tr class="row"></tr>');
      board.append(rowElement);
      row.forEach((value, x) => {
        let tile = this.createTile(value, y, x, sudokuArray);
        rowElement.append(tile);
      });
    });

    return board;
  }

  createTile(value, y, x, sudokuArray) {
    let tile = $(`<td class="tile" id='${y}-${x}'></td>`);
    let input = $(`<input placeholder="${value}" maxlength="1">`);
    let self = this;

    if (value) {
      input.attr('readonly', 'readonly');
    } else {
      input.on('input', function() {
        let val = parseInt($(this).val());
        sudokuArray[y][x] = isNaN(val) ? '' : val;
        if(self.isGameOver()) {
          console.log("Game over");
        }
      });
    }

    tile.append(input);
    return tile;
  }

  isGameOver() {
    return JSON.stringify(this.sudoku.sudokuArray) === JSON.stringify(this.sudoku.solvedArray);
  }
}