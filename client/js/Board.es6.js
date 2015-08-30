import $ from 'jquery';
import Sudoku from 'js/Sudoku';

export default class Board {
  constructor(sudoku) {
    this.sudoku = sudoku;
    $('#sudoku-container')
      .append(this.generateBoard());
  }

  generateBoard() {
    let board = $('<table></table>');
    let sudokuArray = this.sudoku.sudokuArray

    sudokuArray.forEach((row, rowIndex) => {
      let rowElement = $('<tr class="row"></tr>');
      board.append(rowElement);
      row.forEach((value, columnIndex) => {
        let tile = this.createTile(value, rowIndex, columnIndex);
        rowElement.append(tile);
      });
    });

    return board;
  }

  createTile(value, row, column) {
    let tile = $(`<td class="tile" id='${row}-${column}'></td>`);
    let input = $(`<input placeholder="${value}" maxlength="1">`);

    let self = this;

    if (value) {
      input.attr('readonly', 'readonly');
    } else {
      input.keyup(function() {
        if(!$(this).val()) {
          self.sudoku.removeMove(row, column);
        }
      });
      input.on('input', function() {
        let val = parseInt($(this).val());
        if(val !== '' && !self.sudoku.addMove(val, row, column)) {
          $(this).val('');
        }
        if(self.sudoku.isGameOver()) {
          console.log("Done");
          console.log(self.sudoku.sudokuArray);
        }
      });
    }

    tile.append(input);
    return tile;
  }


}