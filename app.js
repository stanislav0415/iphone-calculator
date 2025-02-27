const result = document.querySelector(".result");
result.value = "0";

const buttons = document.querySelectorAll(".buttons button");

let operator = "";
let curResult = 0;
let lastNumber = "";
let newInput = true;
let percentageMode = false;

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const value = e.target.innerText;

    if (!isNaN(value)) { 
      if (newInput) {
        result.value = value; 
        newInput = false;
      } else {
        result.value += value;  
      }
      lastNumber += value;
    } 

    else if (value === "AC") { 
      result.value = "0";
      operator = "";
      curResult = 0;
      lastNumber = "";
      newInput = true;
      percentageMode = false;
    } 

    else if (["+", "-", "x", "÷"].includes(value)) {
      if (lastNumber !== "") {
        if (operator) {
          calculate();
        } else {
          curResult = Number(lastNumber);
        }
      }
      operator = value;
      lastNumber = "";
      result.value = curResult + " " + operator; 
      newInput = true;
      percentageMode = false;
    } 

    else if (value === "=") { 
      if (lastNumber !== "") {
        if (percentageMode) {
          lastNumber = (parseFloat(lastNumber) / 100) * curResult;
          percentageMode = false;
        }
        calculate();
        result.value = curResult;
        lastNumber = "";
        operator = "";
        newInput = true;
      }
    }

    else if (value === "←") {
      if (result.value.length > 1) {
        result.value = result.value.slice(0, -1);  
      } else {
        result.value = "0";  
      }
      if (result.value === "0" && !newInput) {
        newInput = true;  
      }
    }

    else if (value === ".") {
      if (!lastNumber.includes(".")) {
        result.value += value;
        lastNumber += value;
        newInput = false;
      }
    }

    else if (value === "%") {
      if (lastNumber !== "") {
        percentageMode = true;
        result.value = lastNumber + "%";
      }
    }
  });
});

function calculate() {
  if (operator === "+") {
    curResult += Number(lastNumber);
  } else if (operator === "-") {
    curResult -= Number(lastNumber);
  } else if (operator === "x") {
    curResult *= Number(lastNumber);
  } else if (operator === "÷") {
    if (Number(lastNumber) !== 0) {
      curResult /= Number(lastNumber);
    } else {
      alert("Cannot divide by zero");
      result.value = "0";
      curResult = 0;
    }
  }
}
