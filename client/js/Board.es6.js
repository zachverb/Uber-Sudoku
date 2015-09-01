import $ from 'jquery';
import Sudoku from 'js/Sudoku';
import { SUDOKU_ARRAY } from './constants.es6.js';

export default class BoardComponent {
  constructor() {
    this.startGame();
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
    let tile = $(`<td class="tile" id="${row}-${column}"></td>`);
    let input = $(`<input type="tel" placeholder="${value}" maxlength="1">`);
    let self = this;

    if (value) {
      input.prop('disabled', true);
      input.addClass('readonly');
    } else {
      input.on('input', function() {
        let val = parseInt($(this).val());
        if(isNaN(val) || val < 1) {
          $(this).val('');
          self.sudoku.setIndex('', row, column);
        } else {
          self.sudoku.setIndex(val, row, column);
        }
        let conflicts = self.sudoku.findConflicts(val, row, column);
        self.highlightConflicts(conflicts);
        if(conflicts.size === 0 && self.sudoku.isGameOver()) {
          self.gameOver();
        }
      });
    }

    tile.append(input);
    return tile;
  }

  highlightConflicts(conflicts) {
    $('.conflict').removeClass('conflict');
    conflicts.forEach(({row, column}) => {
      let id = `#${row}-${column}`;
      $(id).addClass('conflict');
    });

  }

  gameOver() {
    $("#sudoku-container").fadeTo(2000, 0.33 );
    let header = $("<h1>").text("Game Over");
    let playAgain = $("<h2>").text("Play again?");
    playAgain.click(() => {
      this.restart();
    })
    $("#game-over")
      .append(header)
      .append(playAgain);

    $("#game-over").fadeIn(2000);
  }

  restart() {
    $('#game-over').fadeOut(1000);
    $('#game-over').empty();
    $('#sudoku-container').empty();
    $('#sudoku-container').fadeTo(1000, 1);
    this.startGame();
  }

  startGame() {
    this.sudoku = new Sudoku(SUDOKU_ARRAY);
    $('#sudoku-container').append(this.generateBoard());
  }

}
