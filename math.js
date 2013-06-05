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

function tokenize(input, inProgressToken) {
	if (inProgressToken === undefined) {
		inProgressToken="";
  }

	var current = input[0];
	var remainder = input.slice(1);
	if(input==="" && inProgressToken==="") {
	  //end: no more input, no integer in progress
		return [];
	} else if(input==="" && inProgressToken!=="") {
	  //end: no more input, but need to write current integer in progress
		return [inProgressToken];
  } else if(input!==""&& (!isNaN(current)|| current===".")) {
    //mid: the input exists and current = is a number (or a .)
		return tokenize(remainder, inProgressToken + current);
	} else if(input!==""&& isNaN(current)){
    //mid: input exists and current is not a number
		if(inProgressToken.length!==0) {
			return [inProgressToken].concat(lex(input, ""));
    } else if(inProgressToken.length===0) {
			return [current].concat(tokenize(remainder, ""));
    }
	}
}
//takes an array of numbers/operators and creates a multi-dimensional array when there are parenthesis
function formatArray(lexedArray) {
	if (lexedArray.length==0) {
		return [];
  }

	var formattedArray = [];
	var currentElement = lexedArray[0];
	var remainder = lexedArray.slice(1);

	if (currentElement==="(") {
		var lastIndex = lastIndexOf(")", remainder);
		var element = remainder.slice(0, lastIndex); //element = middle chunk between ()
		remainder = remainder.slice(lastIndex+1); //now remainder = the rest
		currentElement=formatArray(element);
	}
	return([currentElement].concat(formatArray(remainder)));
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

// takes a multi-dimensional array of numbers/operators and performs calculations, returning the result
function doMath(formattedInputArray) {
	//formattedInput example: [["2.1", "*", "17"], "-", "3"]
	var current = formattedInputArray[0];
	var operator = formattedInputArray[1];
	var next = formattedInputArray[2];
	var remainder = formattedInputArray.slice(3);
	if (Array.isArray(current)) {
		current = doMath(current);
  }
	if (Array.isArray(next)) {
		next = doMath(next);
  }
	switch (operator) {
		case "+":
			var result = parseFloat(current) + parseFloat(next)
			break;
		case "-":
			var result = parseFloat(current) - parseFloat(next)
			break;
		case "*":
			var result = parseFloat(current) * parseFloat(next)
			break;
		case "/":
			var result = parseFloat(current) / parseFloat(next)
			break;
	}
	if (formattedInputArray.length>3) {
		result = doMath([result].concat(remainder));
  }
	return result;
}

exports.lex=lex;
exports.doMath=doMath;
exports.formatArray=formatArray;
exports.orderOfOps=orderOfOps;
