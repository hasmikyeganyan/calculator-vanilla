let display = document.getElementById("display");

let button = document.getElementsByClassName("button");

let buttons = Array.from(button);

let operations = ["+", "*", "-", "/", "."];

const findIndicesOfOperations = (arr, searchValue) => {
  let indices = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === searchValue) {
      indices.push(i);
    }
  }
  return indices;
};

const prepareToOperation = (indices, i, splitted) => {
  let index = indices[i];

  if (index !== 1) index -= 2 * i;

  let left = +splitted[index - 1];
  let right = +splitted[index + 1];

  let result = 0;
  switch (splitted[index]) {
    case "+":
      result = left + right;
      break;
    case "-":
      result = left - right;
      break;
    case "*":
      result = left * right;
      break;
    case "/":
      result = left / right;
      break;
  }

  splitted[index - 1] = result;
  splitted.splice(index, 2);

  return result;
};

buttons.map((button) => {
  button.addEventListener("click", (cb) => {
    if (cb.target.innerText === "C") {
      display.innerText = "";
    } else if (cb.target.innerText === "←") {
      display.innerText = display.innerText.slice(0, -1);
    } else if (cb.target.innerText === "=") {
      let splitted = display.innerText.match(/[^\d()]+|[\d.]+/g);

      let result = 0;

      if (splitted.includes("*")) {
        let indices = [];

        indices = findIndicesOfOperations(splitted, "*");

        for (let i = 0; i < indices.length; i++) {
          result = prepareToOperation(indices, i, splitted);
        }
      }

      if (splitted.includes("/")) {
        let indices = [];

        indices = findIndicesOfOperations(splitted, "/");

        for (let i = 0; i < indices.length; i++) {
          result = prepareToOperation(indices, i, splitted);
        }
      }

      if (splitted.includes("+")) {
        let indices = [];

        indices = findIndicesOfOperations(splitted, "+");

        for (let i = 0; i < indices.length; i++) {
          result = prepareToOperation(indices, i, splitted);
        }
      }

      if (splitted.includes("-")) {
        let indices = [];

        indices = findIndicesOfOperations(splitted, "-");

        for (let i = 0; i < indices.length; i++) {
          result = prepareToOperation(indices, i, splitted);
        }
      }

      display.innerText = result;
    } else if (
      display.innerText.length === 0 &&
      operations.includes(cb.target.innerText)
    ) {
      return;
    } else {
      display.innerText += cb.target.innerText;
    }
  });
});
