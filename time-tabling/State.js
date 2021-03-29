
const numberSlots = 4;

// The disciplines are already set.
const disciplines = [
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


class State {


    genRandomSol() {
        let numDiscliplines = disciplines.length;
        let sol = Array(numDiscliplines);
        for (let i = 0; i < numDiscliplines; i++)
            sol[i] = Math.floor(Math.random() * numberSlots + 1);
        return sol;
    }
    /**
      * In a given solution, concatenate all the students for a given slot number. 
      * @param {number} slotNum Slot number.  
      * @param {array} possibleSol A possible solution. 
      */
    getStudentsSlot(slotNum, possibleSol) {
        let slot = [];
        for (let i = 0; i < possibleSol.length; i++) {
            if (possibleSol[i] == slotNum) slot = [...slot, ...disciplines[i]];
        }
        return slot;
    }

    /**
      * Returns number of students with a conflict in the schedule. 
      * @param {array} slot Concanetation of students in all the disciplines in this slot. 
      */
    incompSlot(slot) {
        let duplicates = new Set(slot.filter((item, index) => slot.indexOf(item) !== index));
        return duplicates.size;
    }

    /**
      * Calculates the total number of incompabilities for a given solution. 
      */
    evaluate(solution) {
        let conflicts = 0;
        for (let i = 0; i < solution.length; i++) {
            let slotStudentsConcat = this.getStudentsSlot(i, solution);
            conflicts += this.incompSlot(slotStudentsConcat);
        }
        return conflicts;
    }

    // Calculates a neighbor by swapping two values. 
    neighSwap(solution) {
        let min = 0;
        const max = solution.length - 1;
        let random1 = 0;
        let random2 = 0;
        do {
            random1 = this.getRandomInt(max, min);
            random2 = this.getRandomInt(max, min);
        } while (random1 === random2 || solution[random1] === solution[random2]);

        let temp = solution[random1];
        solution[random1] = solution[random2];
        solution[random2] = temp;
        return solution;
    }

    // Change a value 
    neighChange(solution) {
        let pos = this.getRandomInt(solution.length - 1, 0); 
        let newValue;
        do {
            newValue = this.getRandomInt(numberSlots, 1);
        } while (newValue == solution[pos]);
        solution[pos] = newValue;
        return solution;
    }

    // Change value and swap 
    neighChangeSwap(solution) {
        solution = this.neighChange(solution);
        solution = this.neighSwap(solution);
        return solution;
    }

    getRandomInt(max, min) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

}

module.exports = State;