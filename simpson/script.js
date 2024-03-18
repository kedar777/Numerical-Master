function calculateIntegration() {
    let functionExpression = document.getElementById('functionExpression').value;
    let start = parseFloat(document.getElementById('start').value);
    let end = parseFloat(document.getElementById('end').value);
    let n = parseInt(document.getElementById('intervals').value);
    let h = (end - start) / n;
    let rule = document.querySelector('input[name="integrationRule"]:checked').value;

    let sum1 = 0;
    let sum2 = 0;

    if (rule === '1/3') {
        for (let i = 1; i < n; i += 2) {
            sum1 += func(functionExpression, start + i * h);
        }
        for (let i = 2; i < n - 1; i += 2) {
            sum2 += func(functionExpression, start + i * h);
        }
    } else if (rule === '3/8') {
        for (let i = 1; i < n - 1; i += 3) {
            sum1 += func(functionExpression, start + i * h) + func(functionExpression, start + (i + 1) * h);
        }
        for (let i = 3; i < n - 1; i += 3) {
            sum2 += func(functionExpression, start + i * h);
        }
    }

    let area;
    if (rule === '1/3') {
        area = (h / 3) * (func(functionExpression, start) + 4 * sum1 + 2 * sum2 + func(functionExpression, end));
    } else if (rule === '3/8') {
        area = (3 * h / 8) * (func(functionExpression, start) + 3 * sum1 + 2 * sum2 + func(functionExpression, end));
    }

    document.getElementById('result').textContent = "Area under the curve (" + rule + " Rule): " + area;
}

function func(expression, x) {
    return eval(expression.replace(/x/g, x));
}