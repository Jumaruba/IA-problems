const State = require('./State');

class Solve {
    constructor(){
        this.state = new State();  
    }  
    
    HillClimbing(initSolution) {
        console.log("inside");
        let counter = 0;
        let bestSolUntilNow = initSolution;
        do {
            counter++;
            let tempSol = this.state.neighChangeSwap([...bestSolUntilNow]); 
            if (this.state.evaluate([...bestSolUntilNow]) > this.state.evaluate([...tempSol])) {
                bestSolUntilNow = [...tempSol];
                counter = 0; 
            } 
        } while (counter < 1000); 
        return bestSolUntilNow;

    }

    SimulatedAnnealing(initSolution) {
        let T_final = 0.0000001;    // accurace...
        let T = 1;
        let currSolution = initSolution;
        let alpha = 0.99;   // reduction constant. 
        while (T > T_final) {
            T = T * alpha; 
            let costCurrent = this.state.evaluate([...currSolution]);
            let newSolution = this.state.neighChangeSwap([...currSolution]);
            let costNew = this.state.evaluate([...newSolution]);
            let deltaE = costCurrent - costNew;
            if (deltaE > 0) {
                currSolution = newSolution;
            } else {
                let random = Math.random();
                if (random < Math.exp(deltaE / T)) {
                    currSolution = newSolution;
                }
            }
        }
        return currSolution;
    }


}


module.exports = Solve;