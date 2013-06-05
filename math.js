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
};

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
	if (lexedArray.length==0) {
		return [];
  } else if (lexedArray[0]==="(") {
	  var rest = lexedArray.slice(1);
		var lastIndex = lastIndexOf(")", rest);
		var element = rest.slice(0, lastIndex); //element = middle chunk between ()
    var restAfterElement = rest.slice(lastIndex+1);
	  return [formatArray(element)].concat(formatArray(restAfterElement));
	} else {
	  return [lexedArray[0]].concat(formatArray(lexedArray.slice(1)));
  }
}

//helper fn for formatArray/parenthesis search
function lastIndexOf(number, list) {
  if (list.length === 0) return -1;
  if (list[list.length-1] === number) return list.length - 1;
  return lastIndexOf(number, list.slice(0, list.length - 1));
}

function orderOfOps(formattedArray, inProgressToken) {
	if (arguments.length==1)
		inProgressToken=[];
	var input = formattedArray[0];
	var remainder = formattedArray.slice(1);
	if(Array.isArray(input)) {
		return [orderOfOps(input)];
  }

	//end: no more input, no integer in progress
	if((input===""|| input==undefined) && inProgressToken.length==0) {
		return [];
	//end: input exists but no more remainder
	} else if(input!=="" && remainder=="") {
		return [input];
	//mid: the input exists and current = is a number
	} else if(input!==""&& !isNaN(input)) {
		return orderOfOps(remainder, inProgressToken.concat([input]));
	//mid: input exists and current is not a number
 	} else if(input!==""&& isNaN(input)){
		if(input=="*" || input =="/") {
			var token = [inProgressToken.concat(input).concat([remainder[0]])];
			remainder = remainder.slice(1);
			return token.concat(orderOfOps(remainder));
		}
		if(input=="+" || input =="-"){
			return inProgressToken.concat(input).concat(orderOfOps(remainder));
		}
	}

}

var operatorFns = {
  "+": function(x, y) { return x + y; },
  "-": function(x, y) { return x - y; },
  "*": function(x, y) { return x * y; },
  "/": function(x, y) { return x / y; }
}

// takes a multi-dimensional array of numbers/operators and performs calculations, returning the result
function doMath(nestedMath) {
	//formattedInput example: [["2.1", "*", "17"], "-", "3"]
  if (nestedMath.length === 0) {
    return;
  }
  var operandA = Array.isArray(nestedMath[0]) ? doMath(nestedMath[0]) : nestedMath[0];
  var operandB = Array.isArray(nestedMath[2]) ? doMath(nestedMath[2]) : nestedMath[2];
	var operator = nestedMath[1];
  return operatorFns[operator](parseFloat(operandA), parseFloat(operandB));
}

exports.lex=lex;
exports.doMath=doMath;
exports.formatArray=formatArray;
exports.orderOfOps=orderOfOps;
