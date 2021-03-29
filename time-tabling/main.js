const _ = require("lodash");

let numberSlots = 4;     

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

  
const genRandomSol = () => {
  let numDiscliplines = disciplines.length;  
  let sol = Array(numDiscliplines); 
  for (let i = 0 ; i < numDiscliplines; i++)
    sol[i] = Math.floor(Math.random() * numberSlots + 1);  
  return sol; 
}
/**
  * In a given solution, concatenate all the students for a given slot number. 
  * @param {number} slotNum Slot number.  
  * @param {array} possibleSol A possible solution. 
  */
const getStudentsSlot = (slotNum, possibleSol) => {   
  let slot = []; 
  for (let i = 0; i < possibleSol.length; i++){   
    if (possibleSol[i] == slotNum) slot = [...slot, ...disciplines[i]]; 
  }
   return slot; 
} 

// Calculates the number of students enrolled in both disciplines. 
const incompDisc = (disc1, disc2) =>{ 
  let incompNum = 0;   
  let bothStudents = [...disc1, ...disc2];   
  // Retrieve duplicate items 
  let duplicates = new Set(bothStudents.filter((item, index) => bothStudents.indexOf(item) !== index));  
  return duplicates.size; 
} 

/**
  * Returns number of students with a conflict in the schedule. 
  * @param {array} slot Concanetation of students in all the disciplines in this slot. 
  */ 
const incompSlot = (slot) => { 
  let duplicates = new Set(slot.filter((item, index) => slot.indexOf(item) !== index));   
  return duplicates.size; 
}  

/**
  * Calculates the total number of incompabilities for a given solution. 
  */
const incompSolution = (solution) => {  
  let conflicts = 0; 
  for (let i = 0 ; i < solution.length; i++){
    let slotStudentsConcat= getStudentsSlot(i, solution); 
    conflicts += incompSlot(slotStudentsConcat);  
  }
  return conflicts; 
} 

// Calculates a neighbor by swapping two values. 
const neighSwap = (solution) =>{
  let min = 0; 
  const max = solution.length -1;       
  let random1 = 0; 
  let random2 = 0; 
  do {
    random1 = getRandomInt(max, min); 
    random2 = getRandomInt(max, min); 
  } while (random1 === random2 || solution[random1] === solution[random2]); 
  
  let temp = solution[random1]; 
  solution[random1] = solution[random2]; 
  solution[random2] = temp;  
  return solution;
} 

// Change a value 
const neighChange = (solution) => {  
  let pos = getRandomInt(solution.length-1, 0); 
  let newValue = getRandomInt(numberSlots, 1); 
  solution[pos] = newValue; 
  return solution; 
} 

// Change value and swap 
const neighChangeSwap = (solution) => {
  solution = neighChange(solution); 
  solution = neighSwap(solution); 
  return solution; 
}

const getRandomInt = (max, min) => {
  return Math.floor(Math.random() * (max-min+1)+min); 
} 


// SOLVING METHODS 
const HillClimbing = (initSolution) => {  
  let counter = 0;  
  let bestSolUntilNow = initSolution; 
  do{  
    counter ++; 
    let tempSol = neighChangeSwap([...bestSolUntilNow]);    
    if (incompSolution(bestSolUntilNow) > incompSolution(tempSol)){   
      bestSolUntilNow = [...tempSol]; 
      counter = 0; 
    } 
  }while(counter < 1000);  
  return bestSolUntilNow; 

} 


let randomSol = genRandomSol();     
let solution = HillClimbing(randomSol);
console.log(solution); 
console.log(incompSolution(solution)); 
console.log(HillClimbing(randomSol));  

