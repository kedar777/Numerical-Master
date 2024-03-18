document.getElementById("bisectionForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Get input values
    var expression = document.getElementById("expression").value;
    var a = parseFloat(document.getElementById("value1").value);
    var b = parseFloat(document.getElementById("value2").value);

    // Tolerance
    var tolerance = 0.001;

    // Function to evaluate the expression
    var f = function(x) {
        return eval(expression);
    };

    // Initial approximation
    var x = (a + b) / 2;

    var iteration = 1;

    var resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "<p>*** BISECTION METHOD IMPLEMENTATION ***</p>";

    while ((b - a) > tolerance) {
        x = (a + b) / 2;
        var fx = f(x);
        resultDiv.innerHTML += "<p>Iteration: " + iteration + "&emsp; x = " + x.toFixed(6) + "&emsp;<BR>f(x) = " + fx.toFixed(6) + "</p>";
        if (fx < 0) {
            a = x;
        } else if (fx > 0) {
            b = x;
        } else {
            break; // If f(x) == 0, we found the root, exit the loop
        }
        iteration++;
    }

    var root = f(x);
    resultDiv.innerHTML += "<p style=\"font-size: 30px; color: white;\"> X: " + x.toFixed(6) + "</p>";

});
