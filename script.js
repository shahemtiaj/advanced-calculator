const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
const clearBtn = document.getElementById("clear");
const equalsBtn = document.getElementById("equals");

let expression = "";

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.getAttribute("data-value");
    if (!value) return;
    if (expression.length >= 60) return;
    expression += value;
    updateDisplay();
  });
});

clearBtn.addEventListener("click", () => {
  expression = "";
  updateDisplay();
});

equalsBtn.addEventListener("click", () => {
  try {
    const evaluated = evaluate(expression);
    expression = evaluated.toString();
    updateDisplay();
  } catch {
    display.textContent = "Error";
    expression = "";
  }
});

function updateDisplay() {
  display.textContent = expression || "0";
}

// Evaluate function with ^ support
function evaluate(expr) {
  const safeExpr = expr.replace(/\^/g, "**");
  return Function(`'use strict'; return (${safeExpr})`)();
}
