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

// --< offsets>--
const offsetTop = 0.05;

// --< day-grid >--
const constructTotalDayGridWidthRel = 0.96;
const constructTotalDayGridHeightRel = 0.56;

// --< daylabel-grid >--
const constructDayLabelWidthRel = constructTotalDayGridWidthRel;
const constructDayLabelHeightRel = 0.03;

// --< week-grid >--
const constructWeekWidthRel = 0.03;
const constructWeekHeightRel = constructTotalDayGridHeightRel;

// --< grid-gap >--
const constructGapWidthRel = 0.01;
const constructGapHeightRel = constructGapWidthRel;

const svg = document.querySelector('[data-js="svg"]');

console.log(svg);
svgbuilder();

// <-- koyomi studio submit - read settings -
// <----------------------------------------------
function svgbuilder() {
   let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
   line.setAttribute("x1", "0");
   line.setAttribute("y1", "40");
   line.setAttribute("x2", "960");
   line.setAttribute("y2", "40");
   line.setAttribute("stroke", "red");
   line.setAttribute("stroke-width", "0.5");
   console.log(line);
   svg.append(line);
   /*
   // day number
   let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
   text.setAttribute("x", "10");
   text.setAttribute("y", "100");
   text.setAttribute("text-anchor", "left");
   text.setAttribute("fill", "red");
   text.setAttribute("font-size", "40");
   text.textContent = "01";
   console.log(text);
   svg.append(text);*/

   // holiday
   text = document.createElementNS("http://www.w3.org/2000/svg", "text");
   text.setAttribute("y", "75");
   text.setAttribute("text-anchor", "end");
   text.setAttribute("fill", "red");
   text.setAttribute("font-size", "18");

   let tspan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
   tspan.setAttribute("x", "130");
   tspan.setAttribute("dy", "0");
   tspan.textContent = "Tag der";
   text.append(tspan);

   tspan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
   tspan.setAttribute("x", "130");
   tspan.setAttribute("dy", "20");
   tspan.textContent = "Arbeit";
   text.append(tspan);

   svg.append(text);

   // holiday
   text = document.createElementNS("http://www.w3.org/2000/svg", "text");
   text.setAttribute("x", "480");
   text.setAttribute("y", "25");
   text.setAttribute("text-anchor", "middle");
   text.setAttribute("fill", "red");
   text.setAttribute("font-size", "30");
   text.setAttribute("letter-spacing", 7);
   text.textContent = "Februar";
   svg.append(text);
}

const titleLine = { id: 1, x1: 0, x2: 960, y1: 40, y2: 40, sc: "red", sw: 0.5 };
const dayLinesArray = [{ id: 1, x1: 0, x2: 135, y1: 50, y2: 50, sc: "red", sw: 0.5 }];

let testArray__DayNrs = createDayNumberArray();
function createDayNumberArray() {
   const arr = [];

   const year = 2026;
   const currentMonth = 2;

   const previousMonths = currentMonth > 1 ? currentMonth - 1 : 12;
   const followingMonths = currentMonth < 12 ? currentMonth + 1 : 1;
   const numberOfDaysInThisMonth = new Date(year, currentMonth, 0).getDate();
   const numberOfDaysInLastMonth = new Date(year, previousMonths, 0).getDate();
   const numberOfDaysInNextMonth = new Date(year, followingMonths, 0).getDate();
   const startWeekDayThisMonth = new Date(year, currentMonth, 0).getDay();

   let startWeekDayLastMonth;
   if (startWeekDayThisMonth > 0) startWeekDayLastMonth = numberOfDaysInLastMonth - (startWeekDayThisMonth - 1);
   else startWeekDayLastMonth = null;

   let startDayNextMonth;
   if (startWeekDayThisMonth < 12) startDayNextMonth = numberOfDaysInThisMonth + startWeekDayThisMonth;
   else startDayNextMonth = null;

   const fontSize = 30;
   const fontOffsetX = 10;
   const fontOffsetY = 20;

   // create array
   for (let i = 0; i < 35; i++) {
      if (i < startWeekDayThisMonth) {
         arr.push({
            panel: i + 1,
            x: fontOffsetX + (constructTotalDayGridWidthRel / 7) * 1000 * (i % 7),
            y: fontOffsetY + fontSize + offsetTop * 1000 + (constructTotalDayGridHeightRel / 5) * 1000 * Math.floor(i / 7),
            dayNr: String(startWeekDayLastMonth + i),
         });
      } else if (i < numberOfDaysInThisMonth + startWeekDayThisMonth) {
         arr.push({
            panel: i + 1,
            x: fontOffsetX + (constructTotalDayGridWidthRel / 7) * 1000 * (i % 7),
            y: fontOffsetY + fontSize + offsetTop * 1000 + (constructTotalDayGridHeightRel / 5) * 1000 * Math.floor(i / 7),
            dayNr: String(i - startWeekDayThisMonth + 1).padStart(2, "0"),
         });
      } else {
         arr.push({
            panel: i + 1,
            x: fontOffsetX + (constructTotalDayGridWidthRel / 7) * 1000 * (i % 7),
            y: fontOffsetY + fontSize + offsetTop * 1000 + (constructTotalDayGridHeightRel / 5) * 1000 * Math.floor(i / 7),
            dayNr: String(i + 1 - startDayNextMonth).padStart(2, "0"),
         });
      }
   }
   console.log(arr);

   arr.forEach((element) => {
      let text = document.createElementNS("http://www.w3.org/2000/svg", "text");

      console.log(element.x);
      text.setAttribute("x", String(element.x));
      text.setAttribute("y", String(element.y));
      text.setAttribute("text-anchor", "left");
      text.setAttribute("fill", "red");
      text.setAttribute("font-size", "40");
      text.setAttribute("letter-spacing", 2);
      text.textContent = element.dayNr;

      console.log(text);
      svg.append(text);
   });
}

let testArray__Lines = createLinesArray();
function createLinesArray() {
   const totalWidthPercent = 0.96;
   const arr = [];

   // --< calc horizontal day-grid lines >--
   for (let i = 0; i <= 5; i++) {
      // --< vertical offest
      let yOffset = (constructTotalDayGridHeightRel / 5) * 1000 * i;
      for (let j = 0; j < 7; j++) {
         // --< horizontal offest
         arr.push({
            id: j,
            x1: (constructTotalDayGridWidthRel / 7) * 1000 * j,
            x2: (constructTotalDayGridWidthRel / 7) * 1000 * j + (constructTotalDayGridWidthRel / 7) * 1000,
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
      let xOffset = (constructTotalDayGridWidthRel / 7) * 1000 * i;
      for (let j = 0; j < 5; j++) {
         // --< vertical offest
         arr.push({
            id: j,
            x1: xOffset,
            x2: xOffset,
            y1: offsetTop * 1000 + (constructTotalDayGridHeightRel / 5) * 1000 * j,
            y2: offsetTop * 1000 + (constructTotalDayGridHeightRel / 5) * 1000 * j + (constructTotalDayGridHeightRel / 5) * 1000,
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
            y1: offsetTop * 1000 + constructTotalDayGridHeightRel * 1000 + constructGapHeightRel * 1000 + yOffset,
            y2: offsetTop * 1000 + constructTotalDayGridHeightRel * 1000 + constructGapHeightRel * 1000 + yOffset,
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
               constructTotalDayGridHeightRel * 1000 +
               constructGapHeightRel * 1000 +
               (constructDayLabelHeightRel / 1) * 1000 * j,
            y2:
               offsetTop * 1000 +
               constructTotalDayGridHeightRel * 1000 +
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
            x1: constructTotalDayGridWidthRel * 1000 + constructGapWidthRel * 1000 + (constructWeekWidthRel / 1) * 1000 * j,
            x2:
               constructTotalDayGridWidthRel * 1000 +
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
            x1: constructTotalDayGridWidthRel * 1000 + constructGapWidthRel * 1000 + xOffset,
            x2: constructTotalDayGridWidthRel * 1000 + constructGapWidthRel * 1000 + xOffset,
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

console.log(testArray__Lines);

testArray__Lines.forEach((element) => {
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
