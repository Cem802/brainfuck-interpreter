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

function resetState() {
    memory.fill(0);
    ipointer = 0;
    mpointer = 0;
    output = "";
    input = "";
    program = "";
    astack = [];
}

function sendOutput(value) {
    output += String.fromCharCode(value)
}

function getInput() {
    let val = 0;

    if (input) {
        val = input.charCodeAt(0);
        input = input.substring(1);
    }

    return val;
}

function interpret() {
    let end = false;

    while (!end) {
        switch (program[ipointer]) {
            case '>':
                if (mpointer == memory.length - 1) {
                    memory.push(0, 0, 0, 0, 0);
                }
                mpointer++;
                break;
            case '<':
                mpointer--;
                break;
            case '+':
                memory[mpointer]++;
                break;
            case '-':
                memory[mpointer]--;
                break;
            case '.':
                sendOutput(memory[mpointer]);
                break;
            case ',':
                memory[mpointer] = getInput();
                break;
            case '[':
                if (memory[mpointer] === 0) {
                    let count = 1;
                    while (count > 0) {
                        ipointer++;
                        if (program[ipointer] === '[') count++;
                        else if (program[ipointer] === ']') count--;
                    }
                } else {
                    astack.push(ipointer);
                }
                break;
            case ']':
                if (memory[mpointer] !== 0) {
                    ipointer = astack[astack.length - 1];
                } else {
                    astack.pop();
                }
                break;
            case undefined:
                end = true;
                break;
            default:
                break;
        }
        ipointer++;
    }
    console.log("output", output);
    return output;
}


let codeTextarea = document.getElementById('code');
let runButton = document.getElementById('run');
let outputTextarea = document.getElementById('output');

runButton.addEventListener('click', function () {
    resetState();

    let code = codeTextarea.value;

    program = code;
    console.log(program)
    let output = interpret();
    outputTextarea.value = output;
});