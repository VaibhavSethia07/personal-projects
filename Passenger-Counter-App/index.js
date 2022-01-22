let countEl = document.getElementById("count-el");
let saveEl = document.getElementById("save-el");
let count = 0;

window.increment = function increment() {
  count = count + 1;
  countEl.textContent = count;
};

window.save = function save() {
  let countDash = count + " - ";
  saveEl.textContent += countDash;

  countEl.textContent = 0;
  count = 0;
};
