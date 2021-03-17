class State {
  constructor() {
    this.matrix = [];
    this.initMatrix();
    this.player = 1;
    this.ncol = 7;
    this.nrows = 6;
  }

  //================================================================================
  // Init and aux functions.
  //================================================================================

  initMatrix() {
    for (let i = 0; i < 6; i++) {
      this.matrix.push([]);
      for (let j = 0; j < 7; j++) {
        this.matrix[i][j] = 0;
      }
    }
  }

  /**
   * @returns Returns the board represented as a string.
   */
  getBoardString() {
    let s = "";
    for (let i = 0; i < this.nrows; i++) {
      for (let j = 0; j < this.ncol; j++) {
        s += this.matrix[i][j] + " ";
      }
      s += "\n";
    }
    return s;
  }

  /**
   *
   * @param {*} col Column to where the piece will be added. Range must be 0..6.
   * @param {int} player Can be 1 or 2.
   * @return Returns true if the piece was added. False otherwise.
   */
  addPieceInCol(col, player) {
    if (col >= 7 || col < 0) return false;

    for (let row = this.nrows - 1; row >= 0; row--) {
      if (this.matrix[row][col] === 0) {
        this.matrix[row][col] = player;
        return true;
      }
    }
    return false;
  }

  /**
   * Assigns 2 points to each jog player piece in the center
   * column of the board (column 4) and a point to each piece in the
   * column arount it (columns 3 and 5).
   * @param {int} player Player to be evaluated.
   * @return Return the number of points for a player in the current board.
   */
  central(player) {
    let points = 0;
    // Check pieces at the column 4.
    for (let row = 0; row < 6; row++) {
      if (this.matrix[row][3] === player) points += 2;
      if (this.matrix[row][2] === player) points += 1;
      if (this.matrix[row][4] === player) points += 1;
    }
    return points;
  }
  
  count(counter, value, cell1, cell2, cell3, cell4) {
    let num_occur =
      (cell1 === value) +
      (cell2 === value) +
      (cell3 === value) +
      (cell4 === value);
    if (counter === 4) return num_occur === 4;
    else if (counter === 3) {
      let num_empty =
        (cell1 === 0) + (cell2 === 0) + (cell3 === 0) + (cell4 === 0);
      return num_empty === 1 && num_occur === 3;
    }
  }

  /**
   * To a given state of the board calculates the number of lines
   * with 4 pieces (horizontal, vertical and diagonal) for a given player or
   * with 3 pieces and one empty.
   * @param {int} player
   */
  lines(occur, player) {
    let num_lines = 0;
    for (let row = 0; row < this.nrows; row++) {
      for (let col = 0; col < this.ncol; col++) {
        if (
          col < this.ncol - 3 &&
          this.count(
            occur,
            player,
            this.matrix[row][col],
            this.matrix[row][col + 1],
            this.matrix[row][col + 2],
            this.matrix[row][col + 3]
          )
        )
          num_lines++;
        if (
          row < this.nrows - 3 &&
          this.count(
            occur,
            player,
            this.matrix[row][col],
            this.matrix[row + 1][col],
            this.matrix[row + 2][col],
            this.matrix[row + 3][col]
          )
        )
          num_lines++;

        if (
          row < this.nrows - 3 &&
          col < this.ncol &&
          this.count(
            occur,
            player,
            this.matrix[row][col],
            this.matrix[row + 1][col + 1],
            this.matrix[row + 2][col + 2],
            this.matrix[row + 3][col + 3]
          )
        )
          num_lines++;

        if (
          col > 3 &&
          row < this.nrows - 3 &&
          this.count(
            occur,
            player,
            this.matrix[row][col],
            this.matrix[row + 1][col - 1],
            this.matrix[row + 2][col - 2],
            this.matrix[row + 3][col - 3]
          )
        )
          num_lines++;
      }
    }
    return num_lines;
  }

  isEndGame() {
    if (this.lines(4, 1) > 0) return true;
    if (this.lines(4, 2) > 0) return true;
    return false;
  }
}

module.exports = State;
