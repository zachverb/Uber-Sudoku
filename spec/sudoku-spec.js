import chai from 'chai';
import Board from '../client/js/Board.es6.js';
import { SUDOKU_ARRAY, SOLVED_ARRAY } from '../client/js/constants.es6.js';

let should = chai.should();

describe('Checking for conflicts', function() {
  let board;

  beforeEach(function() {
    board = new Board(SUDOKU_ARRAY);
  });

  it('should return a list with a size of 0 if there are no conflicts with entry', function() {
    board.findConflicts(4, 1, 2).size.should.equal(0);
  });

  it('should find the horizontal conflict at (1, 3)', function() {
    let conflicts = board.findConflicts(1, 1, 1);
    conflicts.size.should.equal(1);
    let conflict = conflicts.get(0);
    conflict.row.should.equal(1);
    conflict.column.should.equal(3);
  });

  it('should find the vertical conflict at (3, 0) and the horizontal at (2, 2), and in the cell.', function() {
    let conflicts = board.findConflicts(8, 2, 0);
    conflicts.size.should.equal(2);
    let conflictRow = conflicts.get(0);
    let conflictColumn  = conflicts.get(1);
    conflictRow.row.should.equal(2);
    conflictRow.column.should.equal(2);
    conflictColumn.row.should.equal(3);
    conflictColumn.column.should.equal(0);
  });

  it('should find no conflicts on a solved array', function() {
    let solvedBoard = new Board(SOLVED_ARRAY);
    solvedBoard.sudokuArray.forEach((row, rowIndex) => {
      row.forEach((value, columnIndex) => {
        solvedBoard.findConflicts(value, rowIndex, columnIndex).size.should.equal(0);
      });
    });
  });
});


describe('function isGameOver', function() {
  it('should fail with the incomplete Sudoku Array', function() {
    let incompleteBoard = new Board(SUDOKU_ARRAY);
    incompleteBoard.isSolved().should.be.false;
  });

  it('should fail if the Sudoku Array has conflicts', function() {
    let solvedBoard = new Board(SOLVED_ARRAY);
    solvedBoard.setIndex(1, 1, 1);
    solvedBoard.setIndex(1, 1, 0);
    solvedBoard.isSolved().should.be.false;
  });

  it('should pass with the solved Sudoku Array', function() {
    let solvedBoard = new Board(SOLVED_ARRAY);
    solvedBoard.isSolved().should.be.true;
  });
});