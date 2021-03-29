const Solve = require('./Solve');
const State = require('./State');
const { performance } = require('perf_hooks');

const solve = new Solve();
const state = new State();

const runAnnealing = (initState) => {
  let start = performance.now();
  let solution = solve.SimulatedAnnealing(initState);
  console.log('Result: ', solution);
  console.log('Evaluate: ', state.evaluate(solution));
  let end = performance.now();
  console.log(`Execution time: ${end - start} ms`);
}

const runHillClimbing = (initState) => {
  let start = performance.now();
  let solution = solve.HillClimbing(initState);
  console.log('Result: ', solution);
  console.log('Evaluate: ', state.evaluate(solution));
  let end = performance.now();
  console.log(`Execution time: ${end - start} ms`);
}

/** 
 * FLAT CASE
 * This is a flat case. Where all the neighboors have the same evaluation. 
 * The annealing can space from that flat, but hill climbing gets stuck.
 */
runAnnealing([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
runHillClimbing([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);

/**
 * ALMOST SOLUTION
 * In this case for some reason the simulatted annealing doesn't go so well.
 */
runAnnealing([1,1,1,2,2,2,3,3,3,4,4,1]);
runHillClimbing([1,1,1,2,2,2,3,3,3,4,4,1]); 

/**
 * LOCAL MINIMUM (?)
 * Both annealing and hill climbing are not able to find better solutions. 
 */
runAnnealing([1,1,4,2,2,2,3,3,3,4,4,1]);
runHillClimbing([1,1,4,2,2,2,3,3,3,4,4,1]); 


/**
 * ANOTHER LOCAL MINIMUM 
 * Notice that annealing goes well on this. But hill climbing get's stuck.
 */
runAnnealing([1,2,3,4,1,2,3,4,1,2,3,4]);
runHillClimbing([1,2,3,4,1,2,3,4,1,2,3,4]); 


