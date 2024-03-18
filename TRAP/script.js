document.getElementById('inputForm').addEventListener('submit', function (event) {
    event.preventDefault();
    let inputMethod = document.querySelector('input[name="inputMethod"]:checked').value;
    let resultDiv = document.getElementById('result');

    if (inputMethod === 'points') {
        let xPoints = document.getElementById('xPoints').value.split(',').map(parseFloat);
        let yPoints = document.getElementById('yPoints').value.split(',').map(parseFloat);
        let area = areaUnderCurve(xPoints, yPoints);
        resultDiv.textContent = "Area under the curve: " + area;
    } else if (inputMethod === 'function') {
        let functionExpression = document.getElementById('functionExpression').value;
        let start = parseFloat(document.getElementById('start').value);
        let end = parseFloat(document.getElementById('end').value);
        let step = parseFloat(document.getElementById('step').value);
        let area = areaUnderCurveFunction(eval(`(x) => ${functionExpression}`), start, end, step);
        resultDiv.textContent = "Area under the curve: " + area;
    }
});

// Toggle visibility of function input based on selected input method
document.querySelectorAll('input[name="inputMethod"]').forEach(function (input) {
    input.addEventListener('change', function () {
        if (this.value === 'function') {
            document.getElementById('functionInput').style.display = 'block';
            document.getElementById('pointsInput').style.display = 'none';
        } else {
            document.getElementById('functionInput').style.display = 'none';
            document.getElementById('pointsInput').style.display = 'block';
        }
    });
});

function areaUnderCurve(pointsX, pointsY) {
    if (pointsX.length !== pointsY.length) {
        console.log("Error: Length of X and Y points must be equal");
        return null;
    }

    let n = pointsX.length;
    let area = 0;

    for (let i = 0; i < n - 1; i++) {
        let base = pointsX[i + 1] - pointsX[i];
        let height = (pointsY[i] + pointsY[i + 1]) / 2;
        area += base * height;
    }

    return area;
}

function areaUnderCurveFunction(func, start, end, step) {
    let area = 0;
    for (let x = start; x < end; x += step) {
        let base = step;
        let height = (func(x) + func(x + step)) / 2;
        area += base * height;
    }
    return area;
}