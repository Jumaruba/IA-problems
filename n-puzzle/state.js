class NPuzzle {
  constructor(num_cols, num_rows, board) {
    this.zero_pos = [];
    this.num_cols = num_cols;
    this.num_rows = num_rows;
    if (board === undefined) this.populate();
    else {
      this.board = board;
      this.num_at_desired_pos = this.calculateAtDesiredPos();
      this.zero_pos = this.calculateZeroPos();
    }

    /**
     * Variables for solving.
     */
    this.g = 0; // Cost to reach state.
    this.f = 0; // Estimated cost.
    this.moves = [];
  }

  getBoardSize() {
    return this.num_cols * this.num_rows;
  }

  //================================================================================
  // Manage elements at right position
  //================================================================================

/**
 * @param {int} num 
 * @returns Returns the right position array for a number. 
 */
    getDesiredPos(num){
      if (num === 0) return [this.num_rows - 1, this.num_cols - 1]; 
      return [ Math.floor((num - 1) / this.num_cols), (num - 1) % this.num_cols]
    } 

  /**
   * @param {Array(2)} pos Current position of num in the this.board
   * @param {int} num Number to be analized
   * @returns Returns true if pos is the correct position for num.
   */
  isAtDesiredPos(pos, num) { 
    return JSON.stringify(pos) === JSON.stringify(this.getDesiredPos(num)); 
  }

  /**
   * Update the quantity of numbers at the correct position upon a movement.
   * @param {Arary(2)} prev_pos Previous position for the number.
   * @param {Array(2)} new_pos New position for the number.
   * @param {int} num The number that has changed the position.
   */
  updateAtDesiredPos(prev_pos, new_pos, num) {
    if (this.isAtDesiredPos(new_pos, num)) this.num_at_desired_pos++;
    else if (this.isAtDesiredPos(prev_pos, num)) this.num_at_desired_pos--;
  }

  //================================================================================
  // Init
  //================================================================================

  /**
   * Brute force approach to calculate the number of elements at the right position.
   * @returns Number of elements at the right position.
   */
  calculateAtDesiredPos() {
    let counter = 0;
    for (let i = 0; i < this.num_rows; i++) {
      for (let j = 0; j < this.num_cols; j++) {
        if (this.isAtDesiredPos([i, j], this.board[i][j])) counter++;
      }
    }
    return counter;
  }

  /**
   * Brute force approach to calculate the current position of the number 0.
   * @returns The position of the number 0 as one Array(2)
   */
  calculateZeroPos() {
    for (let i = 0; i < this.num_rows; i++) {
      for (let j = 0; j < this.num_cols; j++) {
        if (this.board[i][j] === 0) return [i, j];
      }
    }
  }

  /**
   * Brute force approach to generate an board.
   */
  populate() {
    let elements = new Array(this.getBoardSize());
    let element, curr_col;
    this.board = [];

    for (let curr_row = 0; curr_row < this.num_rows; curr_row++) {
      this.board[curr_row] = new Array();

      while (this.board[curr_row].length < this.num_cols) {
        curr_col = this.board[curr_row].length;
        element = Math.floor(Math.random() * this.getBoardSize());

        if (!elements[element]) {
          this.board[curr_row].push(element);
          elements[element] = 1;
          if (element === 0) this.zero_pos = [curr_row, curr_col];
          if (this.isAtDesiredPos([curr_row, curr_col], element))
            this.num_at_desired_pos++;
        }
      }
    }
    console.log(this.zero_pos[0], this.zero_pos[1]);
  }

  //================================================================================
  // Display methods
  //================================================================================

  /**
   * @returns Returns the board represented as a string.
   */
  getBoardString() {
    let s = "";
    for (let i = 0; i < this.num_rows; i++) {
      for (let j = 0; j < this.num_cols; j++) {
        s +=
          this.board[i][j] + " ".repeat(this.calculateSpace(this.board[i][j]));
      }
      s += "\n";
    }
    return s;
  }

  /**
   * Auxiliar function to getBoardString to calculate the correct number of spaces
   * between elements.
   * @param {int} number
   * @returns Returns how many spaces are necessary for a number.
   */
  calculateSpace(number) {
    let max_space = this.getBoardSize().toString().length + 1;
    let number_length = number.toString().length;
    return max_space - number_length;
  }

  //================================================================================
  // Operators
  //================================================================================

  moveZero(offset_row, offset_col) {
    let new_zero_pos = Array(2);
    new_zero_pos[0] = this.zero_pos[0] + offset_row;
    new_zero_pos[1] = this.zero_pos[1] + offset_col;

    let swap_value;
    const prev_zero_pos = [...this.zero_pos];

    // If the new position is valid, move.
    if (this.isValidPosition(new_zero_pos[0], new_zero_pos[1])) {
      // swap.
      swap_value = this.board[new_zero_pos[0]][new_zero_pos[1]];
      this.board[this.zero_pos[0]][this.zero_pos[1]] = swap_value;
      this.board[new_zero_pos[0]][new_zero_pos[1]] = 0;

      this.zero_pos = [new_zero_pos[0], new_zero_pos[1]];

      this.updateAtDesiredPos(
        [new_zero_pos[0], new_zero_pos[1]],
        prev_zero_pos,
        swap_value
      );
      this.updateAtDesiredPos(
        prev_zero_pos,
        [new_zero_pos[0], new_zero_pos[1]],
        0
      );
      return true;
    }
    return false;
  }

  moveZeroUp() {
    return this.moveZero(-1, 0);
  }

  moveZeroDown() {
    return this.moveZero(1, 0);
  }

  moveZeroLeft() {
    return this.moveZero(0, -1);
  }

  moveZeroRight() {
    return this.moveZero(0, 1);
  }

  isValidPosition(row, col) {
    if (row >= this.num_rows || row < 0 || col >= this.num_cols || col < 0)
      return false;
    return true;
  }

  //================================================================================
  // Heuristics.
  //================================================================================

  /**
   * @returns Number of elements at the wrong position.
   */
  getHeuristic1() {
    return this.getBoardSize() - this.num_at_desired_pos;
  }

  /**
   * @return Sum of the manhattan distance. 
   */
  getHeuristic(){ 
    let sum_distance = 0; 
    for (let i = 0; i < this.num_rows; i++){
      for (let j = 0 ; j < this.num_cols; j++){   
        sum_distance += this.calculateManhattan([i,j], this.board[i][j]);  
      }
    }
    return sum_distance; 
  } 

  calculateManhattan(pos, num){ 
    let desired_pos = this.getDesiredPos(num); 
    let x = Math.pow((pos[0]-desired_pos[0]), 2);  
    let y = Math.pow((pos[1]-desired_pos[1]), 2);  
    return Math.sqrt(x + y); 
  }
}

export default NPuzzle;
