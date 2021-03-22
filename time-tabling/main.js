const _ = require("lodash");

// Reprentation of the problem we want to solve.
let slots = [[], [], [], []];

// The disciplines are already set.
let disciplines = [
  [1, 2, 3, 4, 5],
  [6, 7, 8, 9],
  [10, 11, 12],
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [1, 2, 3, 5],
  [6, 7, 8],
  [4, 9, 10, 11, 12],
  [1, 2, 4, 5],
  [3, 6, 7, 8],
  [9, 10, 11, 12],
];

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

/**
 * Get a random list with unique numbers from 0..array.length
 * @param {int} arrayLength
 */
const getRandomArray = (arrayLength) => {
  let visited = Array(arrayLength);
  let finalArray = [];
  let visitedNum = 0;
  while (visitedNum != arrayLength) {
    let random = getRandomInt(arrayLength);
    if (visited[random] !== 1) {
      visited[random] = 1;
      visitedNum++;
      finalArray.push(random);
    }
  }
  return finalArray;
};

/**
 * Supposing equal number of disciplines per slot
 **/
const getRandomSolution = (disciplines, slots) => {
  let randomDisc = getRandomArray(disciplines.length);
  console.log(randomDisc);
  for (let i = 0; i < disciplines.length; i++) {
    let index = i % slots.length;
    slots[index].push(randomDisc[i]);
  }
  return slots;
};

console.log(getRandomSolution(disciplines, slots));
