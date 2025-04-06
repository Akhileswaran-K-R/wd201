/* Inputting through command line 

const readline = require("readline");

const lineDetail = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

lineDetail.question(`Please provide your name - `, (name) => {
  console.log(`Hi ${name}`);
  lineDetail.close();
}); */

/* Passing through args
const args = process.argv;
const num1 = parseInt(args[2]);
const num2 = parseInt(args[3]);
console.log(`The sum is: ${num1 + num2}`);

console.log("args[0]:", args[0]);
console.log("args[1]:", args[1]);
console.log("args[2]:", args[2]);
console.log("args[3]:", args[3]);

const args = process.argv;
const op = args[2];
const a = parseInt(args[3]);
const b = parseInt(args[4]);

let result = 0;
if (op === "add") {
  result = a + b;
} else if (op === "sub") {
  result = a - b;
} else if (op === "mul") {
  result = a * b;
} else {
  result = a / b;
}
console.log(`Result: ${result}`);
*/

// args through minimist
const minimist = require("minimist");
const args = minimist(process.argv.slice(2));

const a = parseInt(args.num1);
const b = parseInt(args.num2);
const op = args.operation;

let result = 0;
if (op === "add") {
  result = a + b;
} else if (op === "sub") {
  result = a - b;
} else if (op === "mul") {
  result = a * b;
} else {
  result = a / b;
}
console.log(`Result: ${result}`);

/* setting default value in args
const args = minimist(process.argv.slice(2),{
  default: {
    num1: 1
  }
});
If num1 is not passed then default value is taken
*/

/* setting another name for variables
const args = minimist(process.argv.slice(2),{
  alias: {
    num1: 'n1',
    num2: 'n2'
  }
});
Works with --num1 or -n1
*/
