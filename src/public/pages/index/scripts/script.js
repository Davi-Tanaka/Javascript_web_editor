const help_screen_content = require("./screen.content.json");

const textarea = document.querySelector(".editor_textarea");
const numbers = document.querySelector(".line-number");

const $outputSection = document.querySelector("#output_section");
const $runCodeButton = document.querySelector(".buttons_wrapper .run");
const $configButton = document.querySelector(".buttons_wrapper .config");
const $helpButton = document.querySelector(".buttons_wrapper .help");

const $configuration_screen = document.querySelector("#configuration_screen");
const $help_screen = document.querySelector("#help_screen");

console.oldLog = console.log;
console.log = (value) => {
  return value;
}

console.oldError = console.error;
console.error = (value) => {
  return value;
}

console.oldClear = console.clear;
console.clear = ()=> {
  console.oldClear();

  clearConsole();
}

async function fillTextAreaLineNumber(e) {
  const num = e.target.value.split("\n").length;
  
  numbers.innerHTML = returnLines(num).join("");
}

function returnLines(length) {
  const arr = Array(length).fill(" ");

  for(let i = 0; i < arr.length; i++) {
    arr[i] = (`<span>${i + 1}</span>`)
  }

  return arr;
}

function createTab(e){
  if (e.key === "Tab") {
    e.preventDefault();

    console.log("tab");

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    textarea.value = textarea.value.substring(0, start) + "\t" + textarea.value.substring(end);
    textarea.selectionStart = textarea.selectionEnd = start + 1;
  }
}

function runJavascriptCode(event, value = textarea.value) {
  const result = eval(value);
  returnResultFromCodeExecution(result);
}

function setTextAreaAutoResizable(e) {
  const target = e.currentTarget;
  textarea.style.height = (target.scrollHeight) + "px";
}

function handleScreen(element, to) {
  element.classList.add(to);
}

function clearConsole() {
  const $outputChildren = $outputSection.querySelectorAll(".result_line");
  const animation_duration = 150

  let time = 150;

  $outputChildren.forEach(elem => {

    time += 50;

    const timeoutToRemoveElement = setTimeout(function() {
      elem.classList.add("removing");

      setTimeout(() => {
        elem.remove();
      }, animation_duration * $outputChildren.length);
    }, time);
  });
}

function returnResultFromCodeExecution(result) {
  const d = new Date();
  let time = d.toLocaleTimeString();

  if(result != undefined || result != null) {
    const resultHTMLString = `<div class="result_line"><span class="result_time">${time}</span><span>${result}</span></div>`
    $outputSection.innerHTML += resultHTMLString;
  }
}

returnResultFromCodeExecution("Hello World !")

$runCodeButton.addEventListener("click", runJavascriptCode);
$configButton.addEventListener("click", () => handleScreen($configuration_screen, "open"));
$helpButton.addEventListener("click", () => handleScreen($help_screen, "open"));

textarea.addEventListener("keyup", setTextAreaAutoResizable);
textarea.addEventListener("keydown", createTab);
textarea.addEventListener("keyup", fillTextAreaLineNumber);
