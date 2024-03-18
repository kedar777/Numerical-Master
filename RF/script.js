// Function to evaluate the equation
function evaluateEquation(x, equation) {
    return eval(equation.replace(/e\^x/g, 'Math.exp(x)')); // Replace e^x with Math.exp(x)
}

// Function to find the root using the false position method
function findRoot() {
    // Get user inputs
    var equation = document.getElementById('equation').value;
    var a = parseFloat(document.getElementById('a').value);
    var b = parseFloat(document.getElementById('b').value);
    var tolerance = parseFloat(document.getElementById('tolerance').value);

    // Check if inputs are valid
    if (isNaN(a) || isNaN(b) || isNaN(tolerance)) {
        alert("Please enter valid numbers for 'a', 'b', and tolerance.");
        return;
    }

    var fa = evaluateEquation(a, equation);
    var fb = evaluateEquation(b, equation);

    var x = 0; // Initialize x
    var iterations = 0;
    var output = ""; // Output message
    var result = document.getElementById("result"); //

    // Iterate until the root is found or until reaching the maximum number of iterations
    while (Math.abs(b - a) > tolerance) {
        iterations++;
        x = (a * evaluateEquation(b, equation) - b * evaluateEquation(a, equation)) / (evaluateEquation(b, equation) - evaluateEquation(a, equation));

        var fx = evaluateEquation(x, equation);

        if (fx == 0 || iterations >= 15) {
            break; // Root found or maximum iterations reached
        } else if (fa * fx < 0) {
            b = x; // Update b
        } else {
            a = x; // Update a
        }

        // Append iteration information to the output message
        output += "Iteration " + iterations + ": &emsp;  x = " + x.toFixed(4) + "<br><br>";
    }

    // Display final output
    result.innerHTML = "<p>Root: " + x.toFixed(4) + "</p>";   
    document.getElementById("output").innerHTML = output;
}
