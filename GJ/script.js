function generateEquationInputs() {
    const numEquations = parseInt(document.getElementById('numEquations').value);
    const equationsInputsDiv = document.getElementById('equationsInputs');
    equationsInputsDiv.innerHTML = ''; // Clear previous inputs

    for (let i = 0; i < numEquations; i++) {
        const equationInput = document.createElement('div');
        equationInput.innerHTML = `
            Equation ${i + 1}: 
            <label for="coefficients${i}">Coefficients (space-separated):</label>
            <input type="text" id="coefficients${i}" class="equationCoefficients" placeholder="Enter coefficients"> <br>
            Constant:  <br>
            <input type="number" id="constant${i}" class="equationConstant" placeholder="Enter constant">
            <br><br>
        `;
        equationsInputsDiv.appendChild(equationInput);
    }
}

// Function to parse equations from input
function parseEquations() {
    const numEquations = parseInt(document.getElementById('numEquations').value);
    const matrix = [];
    for (let i = 0; i < numEquations; i++) {
        const coefficients = document.getElementById(`coefficients${i}`).value.trim().split(/\s+/).map(parseFloat);
        const constant = parseFloat(document.getElementById(`constant${i}`).value);
        matrix.push([...coefficients, constant]);
    }
    return matrix;
}


// Gauss-Jordan method
function gaussJordan(matrix) {
    const numRows = matrix.length;
    const numCols = matrix[0].length;

    for (let pivotRow = 0; pivotRow < numRows; pivotRow++) {
        let pivot = matrix[pivotRow][pivotRow];
        if (pivot === 0) {
            let found = false;
            for (let i = pivotRow + 1; i < numRows; i++) {
                if (matrix[i][pivotRow] !== 0) {
                    [matrix[pivotRow], matrix[i]] = [matrix[i], matrix[pivotRow]]; // Swap rows
                    pivot = matrix[pivotRow][pivotRow];
                    found = true;
                    break;
                }
            }
            if (!found) {
                continue;
            }
        }

        for (let j = pivotRow + 1; j < numCols; j++) {
            matrix[pivotRow][j] /= pivot;
        }
        matrix[pivotRow][pivotRow] = 1;

        for (let i = 0; i < numRows; i++) {
            if (i !== pivotRow) {
                const factor = matrix[i][pivotRow];
                for (let j = pivotRow; j < numCols; j++) {
                    matrix[i][j] -= factor * matrix[pivotRow][j];
                }
            }
        }
    }
    return matrix;
}

// Function to display the solution
function displaySolution(matrix) {
    const numEquations = matrix.length;
    let result = '';
    for (let i = 0; i < numEquations; i++) {
        result += `x${i + 1} = ${matrix[i][numEquations].toFixed(3)}<br>`;
    }
    document.getElementById('result').innerHTML = result;
}

// Function to solve the system of equations
function solve() {
    const matrix = parseEquations();
    const solution = gaussJordan(matrix);
    displaySolution(solution);
}