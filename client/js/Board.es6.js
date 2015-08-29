import $ from 'jquery';
import sudokuArray from 'js/sudokuGenerator';

export default class Board {
  constructor() {
    this.boardArray = sudokuArray;
    $('#sudoku-container')
      .append(this.generateBoard(sudokuArray));
  }

  generateBoard(sudokuArray) {
    let board = $('<table></table>');
    sudokuArray.forEach((row, y) => {
      let rowElement = $('<tr></tr>');
      board.append(rowElement);
      row.forEach((value, x) => {
        let tile = this.createTile(value, x, y);
        rowElement.append(tile);
      })
    })
    return board;
  }

  createTile(value, x, y) {
      return $(`<td class='tile' id='${x}-${y}'>${value}</td>`);
  }
}