import chai from 'chai';
import Sudoku from '../client/js/Sudoku.es6.js';

let should = chai.should();

const SUDOKU_ARRAY = [
  [5, 3, '', '', 7, '', '', '', ''],
  [6, '', '', 1, 9, 5, '', '', ''],
  ['', 9, 8, '', '', '', '', 6, ''],
  [8, '', '', '', 6, '', '', '', 3],
  [4, '', '', 8, '', 3, '', '', 1],
  [7, '', '', '', 2, '', '', '', 6],
  ['', 6, '', '', '', '', 2, 8, ''],
  ['', '', '', 4, 1, 9, '', '', 5],
  ['', '', '', '', 8, '', '', 7, 9]
];

const SOLVED_ARRAY = [
  [5, 3, 4, 6, 7, 8, 9, 1, 2],
  [6, 7, 2, 1, 9, 5, 3, 4, 8],
  [1, 9, 8, 3, 4, 2, 5, 6, 7],
  [8, 5, 9, 7, 6, 1, 4, 2, 3],
  [4, 2, 6, 8, 5, 3, 7, 9, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],
  [9, 6, 1, 5, 3, 7, 2, 8, 6],
  [2, 8, 7, 4, 1, 9, 6, 3, 5],
  [3, 4, 5, 2, 8, 6, 1, 7, 9]
];

describe('Adding a move', function() {
  let sudokuArray;

  before(function() {
    sudokuArray = new Sudoku(SUDOKU_ARRAY);
  });

  it('should fail if it is already in the row', function() {
    let addInvalid = sudokuArray.addMove(5, 0, 2);

    addInvalid.should.be.false;
  });

  it('should fail if it is already in the column', function() {
    let addInvalid = sudokuArray.addMove(5, 2, 0);

    addInvalid.should.be.false;
  });

  it('should fail if it is already in the cell', function() {
    let addInvalid = sudokuArray.addMove(5, 1, 1);

    addInvalid.should.be.false;
  });

  it('should pass if it is not in the row, cell, or column', function() {
    let addInvalid = sudokuArray.addMove(1, 0, 2);

    addInvalid.should.be.true;
  });

});