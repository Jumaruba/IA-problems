class Node {
  constructor(value, children) {
    this.value = value;
    this.children = children;
  }
}

const createTree = () => {
  let M = new Node(3, []);
  let N = new Node(10, []);
  let O = new Node(5, []);
  let P = new Node(12, []);
  let Q = new Node(0, []);
  let R = new Node(4, []);
  let S = new Node(6, []);
  let T = new Node(20, []);
  let U = new Node(8, []);
  let V = new Node(1, []);
  let X = new Node(2, []);
  let Y = new Node(6, []);
  let Z = new Node(8, []);
  let AA = new Node(15, []);
  let AB = new Node(0, []);
  let AC = new Node(5, []);
  let AD = new Node(2, []);
  let AE = new Node(3, []);
  let AF = new Node(10, []);
  let AG = new Node(20, []);
  let AH = new Node(7, []);
  let AI = new Node(20, []);
  let AJ = new Node(30, []);
  let AK = new Node(40, []);
  let AL = new Node(0, []);
  let AM = new Node(0, []);
  let AN = new Node(0, []);

  let N13 = new Node(0, [AL, AM, AN]);
  let N12 = new Node(0, [AI, AJ, AK]);
  let N11 = new Node(0, [AF, AG, AH]);

  let N10 = new Node(0, [AC, AD, AE]);
  let N9 = new Node(0, [Z, AA, AB]);
  let N8 = new Node(0, [V, X, Y]);

  let N7 = new Node(0, [S, T, U]);
  let N6 = new Node(0, [P, Q, R]);
  let N5 = new Node(0, [M, N, O]);

  let N4 = new Node(0, [N11, N12, N13]);
  let N3 = new Node(0, [N8, N9, N10]);
  let N2 = new Node(0, [N5, N6, N7]);
  let N1 = new Node(0, [N2, N3, N4]);
  return N1;
};

const minimax = (root, depth, isMaxTurn) => {
  if (depth == 0) return root.value;
  let chosenValue;

  if (isMaxTurn) chosenValue = -Infinity;
  else chosenValue = Infinity;

  for (let i = 0; i < root.children.length; i++) {
    value = minimax(root.children[i], depth - 1, !isMaxTurn); 

    if (isMaxTurn) chosenValue = Math.max(value, chosenValue);
    else chosenValue = Math.min(value, chosenValue); 

  } 
  return chosenValue; 
};

let N1 = createTree();

console.log(minimax(N1, 3, true));