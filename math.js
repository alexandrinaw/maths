//takes an input string and parses it into a 1d array, keeping digits of a number together and removing white space
function lex(input, inProgressToken) {
	if (arguments.length==1)
		inProgressToken=[];	
	var current = input[0];
	var remainder = input.slice(1);		
	var out =[]; 
	//end: no more input, no integer in progress	
	if(input==="" && inProgressToken==="")
		return []; 
	//end: no more input, but need to write current integer in progress
	else if(input==="" && inProgressToken!=="")
		return [inProgressToken];
	//mid: white space - skip
	else if(current===" ")
		return lex(remainder, inProgressToken)
	//mid: the input exists and current = is a number (or a .) 
	else if(input!==""&& (!isNaN(current)|| current==="."))
		return lex(remainder, inProgressToken + current);	
	//mid: input exists and current is not a number
	else if(input!==""&& isNaN(current)){
		if(inProgressToken.length!==0)
			return [inProgressToken].concat(lex(input, ""));
		else if(inProgressToken.length===0)
			return [current].concat(lex(remainder, ""));
	}
}
//takes an array of numbers/operators and creates a multi-dimensional array when there are parenthesis
function formatArray(lexedArray) {
	var formattedArray = [];
	var currentElement = lexedArray[0];
	var remainder = lexedArray.slice(1);
	if (lexedArray.length==0)
		return [];
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
	var listCopy = list.slice(0);
        if (listCopy.length==0) return -1;
        var current = listCopy.pop();
        if (current==number) return listCopy.length;
        else return lastIndexOf(number, listCopy);
}

// takes a multi-dimensional array of numbers/operators and performs calculations, returning the result
function doMath(formattedInputArray) {
	//formattedInput example: [["2.1", "*", "17"], "-", "3"]
	var current = formattedInputArray[0];
	var operator = formattedInputArray[1];
	var next = formattedInputArray[2];
	var remainder = formattedInputArray.slice(3);
	if (Array.isArray(current))
		current = doMath(current);
	if (Array.isArray(next))
		next = doMath(next);
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
	if (formattedInputArray.length>3)
		result = doMath([result].concat(remainder));
	return result;
}

exports.lex=lex;
exports.doMath=doMath;
exports.formatArray=formatArray;
