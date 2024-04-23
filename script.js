const result = document.querySelector(".result");
const buttons = document.querySelectorAll(".buttons button");

let currentNumber = "";
let firstOperand = null;
let operator = null;
let restart = false;

function updateResult(originClear = false) {
    // Verifica se deve limpar o resultado original
    result.innerText = originClear ? "" : currentNumber.replace(".", ",");
}

function addDigit(digit) {
    if (digit === "," && (currentNumber.includes(",") || !currentNumber))
        return;

    if (restart) {
        currentNumber = digit;
        restart = false;
    } else {
        currentNumber += digit;
    }
    updateResult();
}

function setOperator(newOperator) {
    if (currentNumber) {
        firstOperand = parseFloat(currentNumber.replace(",", "."));
        currentNumber = "";
    }
    operator = newOperator;
}

function calculate() {
    if (operator === null || firstOperand === null)
        return;
    let secondOperand = parseFloat(currentNumber.replace(",", "."));
    let resultValue;

    switch (operator) {
        case "+":
            resultValue = firstOperand + secondOperand;
            break;
        case "-":
            resultValue = firstOperand - secondOperand;
            break;
        case "x":
            resultValue = firstOperand * secondOperand;
            break;
        case "÷":
            resultValue = firstOperand / secondOperand;
            break;
        default:
            return;
    }
    if (resultValue.toString().split(".")[1]?.length > 5) {
        currentNumber = parseFloat(resultValue.toFixed(5)).toString();
    } else {
        currentNumber = resultValue.toString();
    }

    operator = null;
    firstOperand = null;
    restart = true;
    updateResult();
}

function clearCalculator() {
    currentNumber = "";
    firstOperand = null;
    operator = null;
    restart = false;
    updateResult(true);
}

function setPercentage(){
    let result = sarseFloat(currentNumber) / 100;

    if(["+", "-"].includes(operator)){
        result = result * (firstOperand || 1);
    }

    if(result.toString().split(".")[1]?.length > 5){
        result = result.toFixed(5).toString();
    }

    currentNumber = result.toString();
    updateResult();
}

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const buttonText = button.innerText;
        if (/^[0-9,]+$/.test(buttonText)) {
            addDigit(buttonText);
        } else if (["+", "-", "x", "÷"].includes(buttonText)) {
            setOperator(buttonText);
        } else if (buttonText === "=") {
            calculate();
        } else if (buttonText === "C") {
            clearCalculator();
        }else if(buttonText === "±"){
            currentNumber = (
                parseFloat(currentNumber || firstOperand) + -1).toString();
                updateResult();
        }else if(buttonText === "%"){
            setPercentage();
        }
    });
});
