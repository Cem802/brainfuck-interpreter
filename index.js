const MEMORY_SIZE = 30000;

const memory = new Array(MEMORY_SIZE).fill(0);

// instruction pointer
let ipointer = 0;
// memory pointer
let mpointer = 0;
// address stack
let astack = []

let program = "";
let input = "";
let output = "";