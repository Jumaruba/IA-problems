const _ = require("lodash");
const State = require("./state");
const readline = require("readline-sync");

/**
 * Calculates the next move for the bot.
 * @param {State} root
 * @param {int} depth
 * @param {Boolean} isMaxPlayer
 * @param {int} alpha
 * @param {int} beta
 * @returns Array(2) with the first element as the next state and the second the state valuation.
 */
const minimax = (root, depth, isMaxPlayer, alpha, beta) => {
  let finalVal; // Final value for the current state.
  let nextState; // Child to be chosen.
  let val;

  if (isMaxPlayer) root.player = 1;
  else root.player = 2;

  if (depth === 0) {
    return [root, EvalLevel8(root)]; // Change the EvalLevel8 to change the game level.
  }

  let children = getChildren(root);
  if (isMaxPlayer) finalVal = -Infinity;
  else finalVal = Infinity;

  if (isMaxPlayer) {
    val = -Infinity;
    for (let i = 0; i < children.length; i++) {
      val = minimax(children[i], depth - 1, !isMaxPlayer, alpha, beta);
      if (val[1] > finalVal) {
        finalVal = val[1];
        nextState = children[i];
      }
      alpha = Math.max(val[1], alpha);
      if (alpha >= beta) {
        return [nextState, finalVal];
      }
    }
  } else {
    val = Infinity;
    for (let i = 0; i < children.length; i++) {
      val = minimax(children[i], depth - 1, !isMaxPlayer, alpha, beta);
      if (val[1] < finalVal) {
        finalVal = val[1];
        nextState = children[i];
      }
      beta = Math.min(val[1], beta);
      if (alpha >= beta) {
        return [nextState, finalVal];
      }
    }
  }

  return [nextState, finalVal];
};

/**
 * It gets all the children for a given state.
 * @param {State} state State which will produce the children.
 * @returns {array(State)} An array with the possible next moves.
 */
const getChildren = (state) => {
  let children = [];
  for (let i = 0; i < state.ncol; i++) {
    let newChild = _.cloneDeep(state);
    if (newChild.addPieceInCol(i, state.player)) children.push(newChild);
  }
  return children;
};

//================================================================================
// Evaluation functions.
//================================================================================

const EvalLevel2 = (state) => {
  return state.lines(4, 1) - state.lines(4, 2);
};

const EvalLevel4 = (state) => {
  return 100 * EvalLevel2(state) + state.lines(3, 1) - state.lines(3, 2);
};
const EvalLevel6 = (state) => {
  return 100 * EvalLevel2(state) + state.central(1) - state.central(2);
};
const EvalLevel8 = (state) => {
  return 5 * EvalLevel2(state) + EvalLevel6(state);
};


//================================================================================
// Test the game at terminal.
//================================================================================

let state = new State();
let col, inserted;

while (!state.isEndGame()) {
  state.player = 2;
  do {
    col = readline.question("Insert a col: ");
    inserted = state.addPieceInCol(col, 2);
  } while (inserted === false);

  console.log(state.getBoardString());
  resultMinimax = minimax(state, 5, true, -Infinity, Infinity);
  console.log("eval", resultMinimax[1]);
  state = resultMinimax[0];
  console.log(state.getBoardString());
}
