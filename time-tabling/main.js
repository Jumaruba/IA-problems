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
  for (let i = 0; i < disciplines.length; i++) {
    let index = i % slots.length;
    slots[index].push(randomDisc[i]);
  }
  return slots;
};

const incompNumber = (slots, disciplines) => {
  let repeatedNum = 0;
  for (let i = 0; i < slots.length; i++) {
    let students = getSlotStudents(slots, disciplines, i); // Get all the students from a slot.
    console.log(students);
    repeatedNum += countDuplicates(students); // Get the number of repeated students.
  }
  return repeatedNum;
};

const getSlotStudents = (slots, disciplines, number) => {
  let stu = [];
  for (let i = 0; i < slots[number].length; i++) {
    stu = [...stu, ...disciplines[slots[number][i]]];
  }
  return stu;
};

const countDuplicates = (array) => {
  let unique = [];
  let repeatedNum = 0;
  array.forEach((element) => {
    if (unique.includes(element)) repeatedNum++;
    else unique.push(element);
  });
  return repeatedNum;
};

let random = getRandomSolution(disciplines, slots);

console.log(random);
console.log(incompNumber(slots, disciplines));
