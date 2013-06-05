var math = require("./math");
var assert = require("assert");

var toLex = "21*(9-3)";
var afterLex = ["21","*","(","9","-","3",")"]
var afterFormat = ["21","*",["9","-","3"]];
var expectedResult = 126;

assert.deepEqual(math.lex(toLex), afterLex);
assert.deepEqual(math.formatArray(afterLex), afterFormat);
assert.deepEqual(math.doMath(afterFormat), expectedResult);
