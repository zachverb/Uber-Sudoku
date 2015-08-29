import $ from 'jquery';
import sudokuArray from 'js/sudokuGenerator';

export default class Board {
  constructor() {
    this.boardArray = sudokuArray;
    $('#sudoku-container')
      .append(this.generateBoard(this.boardArray));
  }

  generateBoard(sudokuArray) {
    let board = $('<table></table>');
    sudokuArray.forEach((row, y) => {
      let rowElement = $('<tr class="row"></tr>');
      board.append(rowElement);
      row.forEach((value, x) => {
        let tile = this.createTile(value, y, x);
        rowElement.append(tile);
      })
    })
    return board;
  }

  createTile(value, y, x) {
    let tile = $(`<td class="tile" id='${y}-${x}'></td>`);
    tile.append(`<input placeholder="${value}" maxlength="1" readonly="readonly">`);
    return tile;
  }
}