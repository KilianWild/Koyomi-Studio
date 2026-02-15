// <-- Global Variables : -->
let selectedYear = 0;
let selectedMonths = 0;
let selectedNrOfMonths = 0;

const koyomiStudioForm = document.querySelector('[data-js="koyomi-studio-form"]');

// <-- koyomi studio submit - read settings -
koyomiStudioForm.addEventListener("submit", (event) => {
   event.preventDefault();
   selectedYear = event.target.elements.inputYear.value;
   selectedMonths = event.target.elements.inputStartMonth.value;
   selectedNrOfMonths = event.target.elements.inputNrOfMonth.value;

   // start build. . .
   builder();
});

function builder() {
   let div;

   // <-- remove all -->
   koyomiStudioForm.remove();
   document.querySelector("h1").remove();

   // <-- build: -->
   div = document.createElement("div");
   div.innerHTML = "";
}
