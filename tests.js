var math = require("./math");
var assert = require("assert");

var toLex = "2+21*(9-3)";
var afterLex = ["2", "+", "21","*","(","9","-","3",")"]
var afterFormat = ["2", "+", "21","*",["9","-","3"]];
var afterOrderOfOps = ["2", "+",["21", "*", ["9","-","3"]]]; 
var expectedResult = 128;

assert.deepEqual(math.lex(toLex), afterLex);
assert.deepEqual(math.formatArray(afterLex), afterFormat);
assert.deepEqual(math.orderOfOps(afterFormat), afterOrderOfOps);
assert.deepEqual(math.doMath(afterOrderOfOps), expectedResult);
