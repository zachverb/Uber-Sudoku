import chai from 'chai';
import Sudoku from '../client/js/Sudoku.es6.js';
import { SUDOKU_ARRAY, SOLVED_ARRAY } from '../client/js/constants.es6.js';

let should = chai.should();

//describe('Adding a move', function() {
//  let sudokuArray;
//
//  beforeEach(function() {
//    sudokuArray = new Sudoku(SUDOKU_ARRAY);
//  });
//
//  it('should fail if it is already in the row', function() {
//    sudokuArray.addMove(5, 0, 2).should.be.false;
//  });
//
//  it('should fail if it is already in the column', function() {
//    sudokuArray.addMove(5, 2, 0).should.be.false;
//  });
//
//  it('should fail if it is already in the cell', function() {
//    sudokuArray.addMove(5, 1, 1).should.be.false;
//  });
//
//  it('should fail if the user entered the number in the same cell', function() {
//    sudokuArray.addMove(4, 0, 2);
//    sudokuArray.addMove(4, 1, 1).should.be.false;
//  });
//
//  it('should pass if it is not in the row, cell, or column', function() {
//    sudokuArray.addMove(1, 0, 2).should.be.true;
//  });
//});

describe('function isGameOver', function() {
  it('should fail with the incomplete Sudoku Array', function() {
    let incompleteSudoku = new Sudoku();
    incompleteSudoku.isGameOver().should.be.false;
  })

  it('should pass with the solved Sudoku Array', function() {
    let solvedSudoku = new Sudoku(true);
    solvedSudoku.isGameOver().should.be.true;
  })
})