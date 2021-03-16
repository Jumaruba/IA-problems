import { Heap } from "heap-js";
import _ from "lodash";
import NPuzzle from "./state.js";

function clone(obj) {
  return Object.create(
    Object.getPrototypeOf(obj),
    Object.getOwnPropertyDescriptors(obj)
  );
}

function solveAStar(curr_state) {
  let closed = []; // Nodes visited and expanded.
  let open = []; // Nodes visited and not expanded.
  let index_open = -1;
  let index_closed = -1; 
  open.push(curr_state);

  while (open.length > 0) {
    let curr_state = open.shift();
    let children = getPuzzleChildren(curr_state);

    if (curr_state.num_at_desired_pos ===  curr_state.getBoardSize()){ 
        console.log("Number of moves", curr_state.g);
        console.log("Moves", curr_state.moves); 
        return; 
    }

    for (let i = 0; i < children.length; i++) {
      // check if in open array.
      index_open = open.findIndex((element) => compare(element, children[i]));
      index_closed = closed.findIndex((element) => compare(element, children[i])); 
      children[i].g = curr_state.g +1;   
      children[i].f = children[i].g + children[i].getHeuristic();   
      if (index_open !== -1 && children[i].g < open[index_open].g) { 
        open.splice(index_open, 1);   
        open = insertInArray(open, children[i]); 
      } else if (index_closed !== -1 && children[i].g < closed[index_closed].g) {
        closed.splice(index_closed, 1); 
        open = insertInArray(open, children[i]); 
      } else { 
        open = insertInArray(open, children[i]);  
      }
    }  
    closed.push(curr_state); 
  } 
}

const compare = (state1, state2) => {
  return JSON.stringify(state1.board) === JSON.stringify(state2.board);
};
/**
 *
 * @param {Array} array
 * @param {NPuzzle} element
 */
const insertInArray = (array, element) => {
  let counter = 0;
  if (array.length === 0) return [element];
  while (counter < array.length) {
    if (array[counter].f >= element.f) {
      let slice1 = array.slice(0, counter);
      let slice2 = array.slice(counter, array.length);
      return [...slice1, element, ...slice2];
    }
    counter++;
  }
  return array;
};

/**
 * @param {NPuzzle} curr_state State that generates the children.
 * @returns Return an array with the children of the curr_state.
 */
function getPuzzleChildren(curr_state) {
  let children = Array(4);
  let canGenerate = Array(4);
  let result = [];
  for (let i = 0; i < 4; i++) {
    children[i] = _.cloneDeep(curr_state);
  }

  canGenerate[0] = children[0].moveZeroUp();
  children[0].moves.push("up"); 
  canGenerate[1] = children[1].moveZeroDown(); 
  children[1].moves.push("down"); 
  canGenerate[2] = children[2].moveZeroLeft(); 
  children[2].moves.push("left"); 
  canGenerate[3] = children[3].moveZeroRight(); 
  children[3].moves.push("right");

  for (let i = 0; i < 4; i++)
    if (canGenerate[i] === true) result.push(children[i]);

  return result;
}

let board = new NPuzzle(3, 3, [
  [1, 2, 3],
  [5, 0, 6],
  [4, 7, 8],
]); 

solveAStar(board);

board = new NPuzzle(3,3, [[1,3,6],[5,2,0], [4,7,8]]);
solveAStar(board);

// Takes to long 
board = new NPuzzle(3,3, [[1,6,2],[5,7,3], [0,4,8]]);
solveAStar(board); 

board = new NPuzzle(4,4, [[5,1,3,4],[2,0,7,8],[10,6,11,12], [9,13,14,15]]) ;
solveAStar(board);