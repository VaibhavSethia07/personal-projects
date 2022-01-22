let num1 = 2;
let num2 = 8;
let result = 0;

document.getElementById("num1-el").textContent = num1;
document.getElementById("num2-el").textContent = num2;

window.add = function add() {
    result = num1 + num2;
    save(1);
}

window.subtract = function subtract() {
    result = num2 - num1;
    save(2);
}

window.multiply = function multiply() {
    result = num1 * num2;
    save(3);
}

window.divide = function divide() {
    result = num1 / num2;
    save(4);
}

window.save = function save(type) {
    let operation = "";
    switch (type) {
        case 1: operation = "Add: ";
            break;
        case 2: operation = "Subtract: ";
            break;
        case 3: operation = "Multiply: ";
            break;
        case 4: operation = "Divide: ";
            break;
    }
    document.getElementById("result-el").textContent = operation + result;
}



