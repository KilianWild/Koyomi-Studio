// <-- Global Variables : -->
let selectedYear = 0;
let selectedMonths = 0;
let selectedNrOfMonths = 0;
/*
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
*/

const svg = document.querySelector('[data-js="svg"]');

console.log(svg);
svgbuilder();

// <-- koyomi studio submit - read settings -
// <----------------------------------------------
function svgbuilder() {
   let line;

   line = document.createElementNS("http://www.w3.org/2000/svg", "line");
   line.setAttribute("x1", "0");
   line.setAttribute("y1", "40");
   line.setAttribute("x2", "960");
   line.setAttribute("y2", "40");
   line.setAttribute("stroke", "red");
   line.setAttribute("stroke-width", "0.5");
   console.log(line);
   svg.append(line);
}
const titleLine = { id: 1, x1: 0, x2: 960, y1: 40, y2: 40, sc: "red", sw: 0.5 };
const dayLinesArray = [{ id: 1, x1: 0, x2: 135, y1: 50, y2: 50, sc: "red", sw: 0.5 }];

let testArray = createLinesArray();

function createLinesArray() {
   const totalWidthPercent = 0.96;
   const arr = [];

   // --< offsets>--

   const offsetTop = 0.05;

   // --< day-grid >--
   const construcTotalDayGridWidthRel = 0.96;
   const construcTotalDayGridHeightRel = 0.56;

   // --< daylabel-grid >--
   const constructDayLabelWidthRel = construcTotalDayGridWidthRel;
   const constructDayLabelHeightRel = 0.03;

   // --< week-grid >--
   const constructWeekWidthRel = 0.03;
   const constructWeekHeightRel = construcTotalDayGridHeightRel;

   // --< grid-gap >--
   const constructGapWidthRel = 0.01;
   const constructGapHeightRel = constructGapWidthRel;

   // --< calc horizontal day-grid lines >--
   for (let i = 0; i <= 5; i++) {
      // --< vertical offest
      let yOffset = (construcTotalDayGridHeightRel / 5) * 1000 * i;
      for (let j = 0; j < 7; j++) {
         // --< horizontal offest
         arr.push({
            id: j,
            x1: (construcTotalDayGridWidthRel / 7) * 1000 * j,
            x2: (construcTotalDayGridWidthRel / 7) * 1000 * j + (construcTotalDayGridWidthRel / 7) * 1000,
            y1: 50 + yOffset,
            y2: 50 + yOffset,
            sc: "red",
            sw: 0.5,
         });
      }
   }

   // --< calc vertical day-grid lines >--
   for (let i = 0; i <= 7; i++) {
      // --< horizontal offest
      let xOffset = (construcTotalDayGridWidthRel / 7) * 1000 * i;
      for (let j = 0; j < 5; j++) {
         // --< vertical offest
         arr.push({
            id: j,
            x1: xOffset,
            x2: xOffset,
            y1: offsetTop * 1000 + (construcTotalDayGridHeightRel / 5) * 1000 * j,
            y2: offsetTop * 1000 + (construcTotalDayGridHeightRel / 5) * 1000 * j + (construcTotalDayGridHeightRel / 5) * 1000,
            sc: "red",
            sw: 0.5,
         });
      }
   }

   // --< calc horizontal daylable-grid lines >--
   for (let i = 0; i <= 1; i++) {
      // --< vertical offest
      let yOffset = (constructDayLabelHeightRel / 1) * 1000 * i;
      for (let j = 0; j < 7; j++) {
         // --< horizontal offest
         arr.push({
            id: j,
            x1: (constructDayLabelWidthRel / 7) * 1000 * j,
            x2: (constructDayLabelWidthRel / 7) * 1000 * j + (constructDayLabelWidthRel / 7) * 1000,
            y1: offsetTop * 1000 + construcTotalDayGridHeightRel * 1000 + constructGapHeightRel * 1000 + yOffset,
            y2: offsetTop * 1000 + construcTotalDayGridHeightRel * 1000 + constructGapHeightRel * 1000 + yOffset,
            sc: "red",
            sw: 0.5,
         });
      }
   }

   // --< calc vertical day-grid lines >--
   for (let i = 0; i <= 7; i++) {
      // --< horizontal offest
      let xOffset = (constructDayLabelWidthRel / 7) * 1000 * i;
      for (let j = 0; j < 1; j++) {
         // --< vertical offest
         arr.push({
            id: j,
            x1: xOffset,
            x2: xOffset,
            y1:
               offsetTop * 1000 +
               construcTotalDayGridHeightRel * 1000 +
               constructGapHeightRel * 1000 +
               (constructDayLabelHeightRel / 1) * 1000 * j,
            y2:
               offsetTop * 1000 +
               construcTotalDayGridHeightRel * 1000 +
               constructGapHeightRel * 1000 +
               (constructDayLabelHeightRel / 1) * 1000 * j +
               (constructDayLabelHeightRel / 1) * 1000,
            sc: "red",
            sw: 0.5,
         });
      }
   }

   // --< calc horizontal week-grid lines >--
   for (let i = 0; i <= 5; i++) {
      // --< vertical offest
      let yOffset = (constructWeekHeightRel / 5) * 1000 * i;
      for (let j = 0; j < 1; j++) {
         // --< horizontal offest
         arr.push({
            id: j,
            x1: construcTotalDayGridWidthRel * 1000 + constructGapWidthRel * 1000 + (constructWeekWidthRel / 1) * 1000 * j,
            x2:
               construcTotalDayGridWidthRel * 1000 +
               constructGapWidthRel * 1000 +
               (constructWeekWidthRel / 1) * 1000 * j +
               (constructWeekWidthRel / 1) * 1000,
            y1: offsetTop * 1000 + yOffset,
            y2: offsetTop * 1000 + yOffset,
            sc: "red",
            sw: 0.5,
         });
      }
   }

   // --< calc vertical week-grid lines >--
   for (let i = 0; i <= 1; i++) {
      // --< horizontal offest
      let xOffset = (constructWeekWidthRel / 1) * 1000 * i - 0.5; // -1 becasue of  end of div
      for (let j = 0; j < 7; j++) {
         // --< vertical offest
         arr.push({
            id: j,
            x1: construcTotalDayGridWidthRel * 1000 + constructGapWidthRel * 1000 + xOffset,
            x2: construcTotalDayGridWidthRel * 1000 + constructGapWidthRel * 1000 + xOffset,
            y1: offsetTop * 1000 + (constructWeekHeightRel / 7) * 1000 * j,
            y2: offsetTop * 1000 + (constructWeekHeightRel / 7) * 1000 * j + (constructWeekHeightRel / 7) * 1000,
            sc: "red",
            sw: 0.5,
         });
      }
   }

   console.log(arr);

   return arr;
}

console.log(testArray);

testArray.forEach((element) => {
   line = document.createElementNS("http://www.w3.org/2000/svg", "line");
   line.setAttribute("x1", String(element.x1));
   line.setAttribute("y1", String(element.y1));
   line.setAttribute("x2", String(element.x2));
   line.setAttribute("y2", String(element.y2));
   line.setAttribute("stroke", element.sc);
   line.setAttribute("stroke-width", String(element.sw));
   console.log(line);
   svg.append(line);
});

function arrayShuffle(arr) {
   let a = [...arr];
   for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
   }
   return a;
}

line = document.createElementNS("http://www.w3.org/2000/svg", "line");

line.setAttribute("x1", "0");
line.setAttribute("y1", "50");
line.setAttribute("x2", "0");
line.setAttribute("y2", "610");
line.setAttribute("stroke", "red");
line.setAttribute("stroke-width", "3");
console.log(line);
svg.append(line);
