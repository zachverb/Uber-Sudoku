import $ from 'jquery';
import Sudoku from 'js/Sudoku';

export default class BoardComponent {
  constructor(sudoku) {
    this.sudoku = sudoku;
    $('#sudoku-container').append(this.generateBoard());
    $('#sudoku-container').append(this.generateOptions());
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

  generateOptions() {

  }

  createTile(value, row, column) {
    let tile = $(`<td class="tile" id='${row}-${column}'></td>`);
    let input = $(`<input type="tel" placeholder="${value}" maxlength="1">`);
    let self = this;

    if (value) {
      input.prop('disabled', true);
      input.addClass('readonly');
    } else {
      input.on('input', function() {
        console.log("input");
        let val = parseInt($(this).val());
        if(isNaN(val) || !self.sudoku.addMove(val, row, column)) {
          $(this).val('');
          self.sudoku.setIndex('', row, column);
        } else if(self.sudoku.isGameOver()) {
          self.gameOver();
        }
      });
    }

    tile.append(input);
    return tile;
  }

  //gameOver() {
  //  $('#sudoku-container').append()
  //}

}
