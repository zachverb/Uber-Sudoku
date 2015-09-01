import $ from 'jquery';
import Board from 'js/Board';
import { SUDOKU_ARRAY } from './constants.es6.js';

/**
 * The main Sudoku game class. Creates a new board based off array
 * and generates the DOM elements. Also handles start, end, restart logic.
 */
export default class Game {
  constructor() {
    this.board = new Board(SUDOKU_ARRAY);
  }

  /**
   * creates a new Sudoku object, and generates a board component from it.
   */
  startGame() {
    $('#sudoku-container').append(this.generateBoard());
  }

  /**
   * Simple animation that will give the option to restart.
   */
  endGame() {
    $("#sudoku-container").fadeTo(2000, 0.33 );
    let header = $("<h1>").text("Game Over");
    let playAgain = $("<h2>").text("Play again?");

    playAgain.click(() => {
      this.restart();
    });

    $("#game-over")
      .append(header)
      .append(playAgain);

    $("#game-over").fadeIn(2000);
  }

  /**
   * Empties the existing contents and starts the game again
   */
  restart() {
    $('#game-over').fadeOut(1000);
    $('#game-over').empty();
    $('#sudoku-container').empty();
    $('#sudoku-container').fadeTo(1000, 1);
    this.Board = new Board(SUDOKU_ARRAY);
    this.startGame();
  }

  /**
   * @returns { <table> } board
   * Creates and returns a table DOM element and iterates over the
   * sudoku array to create elements.
   */
  generateBoard() {
    let board = $('<table></table>');
    let sudokuArray = this.board.sudokuArray;

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

  /**
   * @param { number } value - The Sudoku number value for the tile.
   * @param { number } row - The index of the outer sudoku array
   * @param { number } column - The index of the inner sudoku array
   * @returns { <td> } tile - the DOM element representing a single tile
   * Returns a new tile with an input inside of it.
   * If a value exists, the input will be disabled.
   * Otherwise it will add a listener that will only
   * allow numbers to 1-9 to be added.
   * Highlights conflicts on conflicting values
   * Ends game when there are no conflicts and the sudoku object is over.
   */
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
          self.board.setIndex('', row, column);
        } else {
          self.board.setIndex(val, row, column);
        }

        let conflicts = self.board.findConflicts(val, row, column);
        self.highlightConflicts(conflicts);

        if(conflicts.size === 0 && self.board.isSolved()) {
          self.endGame();
        }
      });
    }

    tile.append(input);
    return tile;
  }

  /**
   * @param { List } conflicts - A list of objects holding the row and column
   *                           indexes of the conflicting values.
   *
   * Unhighlights the old conflicts, highlights the new
   */
  highlightConflicts(conflicts) {
    $('.conflict').removeClass('conflict');

    // destructuring the inner objects to define the row and column attributes
    conflicts.forEach(({row, column}) => {
      let id = `#${row}-${column}`;
      $(id).addClass('conflict');
    });
  }
}
