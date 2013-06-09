var math = require("./math");
var assert = require("assert");

var toLex = "2+21*(9-3)";
var afterLex = ["2", "+", "21", "*", "(", "9", "-", "3", ")"]
var afterFormat = ["2", "+", "21", "*", ["9", "-", "3"]];
var afterOrderOfOps = ["2", "+", ["21", "*", ["9", "-", "3"]]];
var expectedResult = 128;

assert.deepEqual(math.lex(toLex), afterLex);
assert.deepEqual(math.formatArray(afterLex), afterFormat);
assert.deepEqual(math.orderOfOps(afterFormat), afterOrderOfOps);
assert.deepEqual(math.doMath(afterOrderOfOps), expectedResult);

var a = "2*3*4*5";
var b = ["2", "*", "3", "*", "4", "*", "5"];
var c = ["2", "*", "3", "*", "4", "*", "5"];
var d = [
    [
        ["2", "*", "3"], "*", "4"], "*", "5"];
assert.deepEqual(math.lex(a), b);
assert.deepEqual(math.formatArray(b), c);
assert.deepEqual(math.orderOfOps(c), d);
assert.deepEqual(math.doMath(d), 120);

var afterLex2 = ["17", "*", "3", "-", "(", "9", "/", "(", "2", "+", "1", ")", ")", "-", "6"];

var afterFormat2 = ["17", "*", "3", "-", ["9", "/", ["2", "+", "1"]], "-", "6"];

var afterOrderOfOps2 = [
    ["17", "*", "3"], "-", ["9", "/", ["2", "+", "1"]], "-", "6"];

// lexer

// whitespace
assert.deepEqual(math.lex("(  (5 +   1)  /  3  "), ["(", "(", "5", "+", "1", ")", "/", "3"]);

// empty input
assert.deepEqual(math.lex(""), []);
