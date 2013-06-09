function maths(input) {
    return (doMath(orderOfOps(formatArray(lex(input)))));
}

//takes an input string and parses it into a 1d array, keeping digits of a number together and removing white space
function lex(input) {
  return tokenize(removeWhitespace(input));
}

function removeWhitespace(input) {
  if (input === "") {
    return "";
  } else {
    var out = input[0] === " " ? "" : input[0];
    return out + removeWhitespace(input.slice(1));
  }
}

var isPartOfMultiCharToken = function(charStr) {
  return charStr !== undefined && (!isNaN(charStr) || charStr === ".");
};

function tokenize(input, inProgressToken) {
  if (input.length === 0) {
    return [];
  } else if (isPartOfMultiCharToken(input[0])) {
    inProgressToken = (inProgressToken || "") + input[0];
    if (isPartOfMultiCharToken(input[1])) {
      return tokenize(input.slice(1), inProgressToken);
    } else {
      return [inProgressToken].concat(tokenize(input.slice(1)));
    }
  } else {
    return [input[0]].concat(tokenize(input.slice(1)));
  }
}
//takes an array of numbers/operators and creates a multi-dimensional array when there are parenthesis
function formatArray(lexedArray) {
  if (lexedArray.length===0) {
	return [];
  } else if (lexedArray[0]==="(") {
    var rest = lexedArray.slice(1);
    var count=0;
    var element;
    var restAfterElement;
    for (var i=0; i<rest.length; i++) {
        var current = rest[i]; 
        if (current==="("){
            count++;
        }
        else if (current ===")" && count===0){
            element=rest.slice(0, i);
            restAfterElement = rest.slice(i+1);
            break;
        }
        else if (current===")"){
            count--;
        }
    }
    return [formatArray(element)].concat(formatArray(restAfterElement));
  } else {
    return [lexedArray[0]].concat(formatArray(lexedArray.slice(1)));
  }
}

var operatorVals = {
  "+":1, 
  "-":2,
  "*":3, 
  "/":4,
  "^":5
};

function compOps(a, b) {
    return (operatorVals[a]-operatorVals[b]);
}

function orderOfOps(input) {
    //input: ["4", "+", "5", "*", "7"]
    //output: ["4", "+", ["5", "*", "7"]]]

    //input: ["4", "*", "5", "+", "7"]
    //output: [["4", "*", "5"], "+", "7"]]
    var first = input[0];
    var op1 = input[1];
    var second = input[2];
    var op2=input[3];
    var rest = input.slice(3);
    if (input.length===1){
        if(Array.isArray(first))
            return orderOfOps(first);
        else return [first];
    }
    if (input.length===3){
        if (Array.isArray(first)&&first.length!==1) 
            first = orderOfOps(first);
        if (Array.isArray(second)&&second.length!==1)
            second = orderOfOps(second);
        return [first].concat(op1, [second]); 
    }
    if(compOps(op1, op2)<0){
        return ([first].concat(op1).concat([orderOfOps(input.slice(2))]));
    }
    else {
        var element = [first].concat([op1, second]);
        return (orderOfOps([element].concat(rest)));
    }
}

var operatorFns = {
  "+": function(x, y) { return x + y; },
  "-": function(x, y) { return x - y; },
  "*": function(x, y) { return x * y; },
  "/": function(x, y) { return x / y; },
  "^": function(x, y) { return Math.pow(x, y)}
};

// takes a multi-dimensional array of numbers/operators and performs calculations, returning the result
function doMath(nestedMath) {
  //formattedInput example: [["2.1", "*", "17"], "-", "3"]
  if (nestedMath.length === 0) {
    return;
  }
  var operandA = Array.isArray(nestedMath[0]) ? doMath(nestedMath[0]) : nestedMath[0];
  var operandB = Array.isArray(nestedMath[2]) ? doMath(nestedMath[2]) : nestedMath[2];
  var operator = nestedMath[1];
  if (operator===undefined)
    return operandA;
  var result = operatorFns[operator](parseFloat(operandA), parseFloat(operandB));
  if (nestedMath.length>3)
    result=doMath([result].concat(nestedMath.slice(3)));
  return result;
}

exports.lex=lex;
exports.doMath=doMath;
exports.formatArray=formatArray;
exports.orderOfOps=orderOfOps;
exports.maths=maths;
