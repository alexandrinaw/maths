window.onload = function() {
    document.getElementById("calculate").onclick = function() {
        displayResults();
    };
    document.getElementById("input_box").onkeypress = function() {
        if (window.event.keyCode == 13) displayResults();
    };
    createNumbers();
    ["+", "-", "*", "/", "^"].forEach(createOperators);
};

function displayResults() {
    var expression = document.getElementById("input_box").value;
    var maths_results = maths(expression);
    if (isNaN(maths_results)) {
        document.getElementById("result").innerHTML = "Uh oh! Error!";
        document.getElementById("result_text").innerHTML = "";

    }
    else {
        document.getElementById("result").innerHTML = maths_results;
        document.getElementById("result_text").innerHTML = "" + expression + " = ";
    }
}

function createNumbers() {
    for (var i = 0; i < 10; i++) {
        var newNumber = document.createElement("div");
        newNumber.innerHTML = i;
        var br = document.createElement("br");
        newNumber.onclick = function() {
            document.getElementById("input_box").value = document.getElementById("input_box").value + this.innerHTML;
        };
        document.getElementById("numbers").appendChild(newNumber);
        if (i === 4) document.getElementById("numbers").appendChild(br);
    }
}

function createOperators(element, index, array) {
    var newOp = document.createElement("div");
    newOp.innerHTML = element;
    newOp.onclick = function() {
        document.getElementById("input_box").value = document.getElementById("input_box").value + this.innerHTML;
    };
    document.getElementById("operators").appendChild(newOp);
}
