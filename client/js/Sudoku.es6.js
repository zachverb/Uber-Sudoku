let sudokuArray = [
  ['', '', '', 7, '', '', 8, 6, ''],
  [1, '', '', 2, '', '', '', 4, ''],
  ['', '', '', 4, 8, 5, '', '', ''],
  ['', '', 3, '', '', 9, 6, 7, ''],
  ['', '', 9, '', '', '', 4, '', ''],
  ['', 7, 5, 3, '', '', 9, '', ''],
  ['', '', '', 9, 7, 4, '', '', ''],
  ['', 9, '', '', '', 2, '', '', 1],
  ['', 2, 8, '', '', 3, '', '', '']
];

export default class Sudoku {
  constructor() {
    this.sudokuArray = sudokuArray;
    this.solvedArray = this.solve(this.sudokuArray);
  }

  solve(array) {
    return array;
  }
}
