// Function to evaluate the equation
const evaluateEquation = (equation, x) => {
    return eval(equation);
};

// Function to evaluate the derivative of the equation
const evaluateDerivative = (derivative, x) => {
    return eval(derivative);
};

// Newton-Raphson method
const newtonRaphson = (equation, derivative, initialGuess, tolerance = 0.001) => {
    let x0 = initialGuess;
    let x1;
    let iterations = [];
    do {
        x1 = x0 - evaluateEquation(equation, x0) / evaluateDerivative(derivative, x0);
        iterations.push({x: x1, fx: evaluateEquation(equation, x1), fpx: evaluateDerivative(derivative, x1)});
        if (Math.abs(x1 - x0) < tolerance) {
            return iterations;
        }
        x0 = x1;
    } while (true);
};

// Function to find the root
const findRoot = () => {
    const equation = document.getElementById('equation').value;
    const derivative = document.getElementById('derivative').value;
    const initialGuess = parseFloat(document.getElementById('initialGuess').value);
    
    const iterations = newtonRaphson(equation, derivative, initialGuess);
    var final=document.getElementById("Final");
    
    let result = '';
    let root = iterations[iterations.length - 1].x; // Get the root from the last iteration
    for (let i = 0; i < iterations.length; i++) {
        result += `Iteration ${i + 1}:&emsp; f(x) = ${iterations[i].fx.toFixed(3)},&emsp; f'(x) = ${iterations[i].fpx.toFixed(3)},&emsp; x = ${iterations[i].x.toFixed(3)}<br>`;
    }
    final.innerHTML = "<p>Root: " + root.toFixed(3) + "</p>"; // Display the root value
    document.getElementById('result').innerHTML = result;
};
