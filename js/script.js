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

const languages = [
   {
      lng: "DE",
      year: "Jahr",
      week: "KW",
      month_0: "Januar",
      month_1: "Februar",
      month_2: "März",
      month_3: "April",
      month_4: "Mai",
      month_5: "Juni",
      month_6: "Juli",
      month_7: "August",
      month_8: "September",
      month_9: "Oktober",
      month_10: "November",
      month_11: "Dezember",
      weekday_0: "So",
      weekday_1: "Mo",
      weekday_2: "Di",
      weekday_3: "Mi",
      weekday_4: "Do",
      weekday_5: "Fr",
      weekday_6: "Sa",
   },
   {
      lng: "EN",
      year: "Year",
      week: "CW",
      month_0: "January",
      month_1: "February",
      month_2: "March",
      month_3: "April",
      month_4: "May",
      month_5: "June",
      month_6: "July",
      month_7: "August",
      month_8: "September",
      month_9: "October",
      month_10: "November",
      month_11: "December",
      weekday_0: "Su",
      weekday_1: "Mo",
      weekday_2: "Tu",
      weekday_3: "We",
      weekday_4: "Th",
      weekday_5: "Fr",
      weekday_6: "Sa",
   },
   {
      lng: "JP",
      year: "年",
      week: "週",
      month_0: "January",
      month_1: "February",
      month_2: "March",
      month_3: "April",
      month_4: "May",
      month_5: "June",
      month_6: "July",
      month_7: "August",
      month_8: "September",
      month_9: "October",
      month_10: "November",
      month_11: "December",
      weekday_0: "日",
      weekday_1: "月",
      weekday_2: "火",
      weekday_3: "水",
      weekday_4: "木",
      weekday_5: "金",
      weekday_6: "土",
   },
];

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

// --< colors >--

const svg = document.querySelector('[data-js="svg"]');

svgbuilder();

// <-- koyomi studio submit - read settings -
// <----------------------------------------------
function svgbuilder() {
   /*
   // holiday
   let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
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

   svg.append(text);*/
}

// August 2021
const year = 2021;
const currentMonth = 5; //2 == March

createFlavorText();
function createFlavorText() {
   let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
   text.setAttribute("x", "10");
   text.setAttribute("y", "680");
   text.setAttribute("text-anchor", "start");
   text.classList.add("color-text-weekday");
   text.setAttribute("font-size", "16");
   text.setAttribute("letter-spacing", 4);
   text.textContent = "カレンダー";

   svg.append(text);
   text = document.createElementNS("http://www.w3.org/2000/svg", "text");
   text.setAttribute("x", "990");
   text.setAttribute("y", "680");
   text.setAttribute("text-anchor", "end");
   text.classList.add("color-text-weekday");
   text.setAttribute("font-size", "16");
   text.setAttribute("letter-spacing", 4);
   text.textContent = languages.find((language) => language.lng == "DE").year + " " + year;

   svg.append(text);
}

createHEaderLine();
function createHEaderLine() {
   let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
   line.setAttribute("x1", "0");
   line.setAttribute("y1", "40");
   line.setAttribute("x2", "960");
   line.setAttribute("y2", "40");
   line.classList.add("color-line-weekday");
   line.setAttribute("stroke-width", "0.5");

   svg.append(line);
}
createMonthHeader();
function createMonthHeader() {
   let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
   text.setAttribute("x", "480");
   text.setAttribute("y", "25");
   text.setAttribute("text-anchor", "middle");
   text.classList.add("color-text-weekday");
   text.setAttribute("font-size", "30");
   text.setAttribute("letter-spacing", 7);
   text.textContent = languages.find((language) => language.lng == "DE")[`month_${currentMonth}`];
   svg.append(text);
}

createDayNameArray();
function createDayNameArray() {
   const arr = [];
   let obj;
   const fontSize = 18;
   for (let i = 0; i < 7; i++) {
      obj = {
         panel: i + 1,
         x: 30 + (constructTotalDayGridWidthRel / 7) * 1000 * i,
         y:
            2 +
            offsetTop * 1000 +
            (constructTotalDayGridHeightRel + constructDayLabelHeightRel / 2 + constructGapHeightRel) * 1000,
      };

      if (i % 7 < 1 || i % 7 == 6) obj.isColored = true;
      else obj.isColored = false;

      arr.push(obj);
   }

   arr.forEach((element, index) => {
      let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.setAttribute("x", String(element.x));
      text.setAttribute("y", String(element.y));
      text.setAttribute("text-anchor", "middle");
      text.classList.add(`color-text-${element.isColored ? "holiday" : "weekday"}`);
      text.setAttribute("font-size", String(fontSize));
      text.setAttribute("letter-spacing", 2);
      text.setAttribute("dominant-baseline", "middle");

      text.textContent = languages.find((language) => language.lng == "JP")[`weekday_${index}`] + ".";

      svg.append(text);
   });
}

createWeekNumberArray();
function createWeekNumberArray() {
   const arr = [];
   const numberOfFirstWeekThisMonth = (currentMonth - 1) * 4;
   const fontSize = 18;

   for (let i = 0; i < 5; i++) {
      arr.push({
         panel: i + 1,
         x: 2 + (constructWeekWidthRel * 1000) / 2 + (constructTotalDayGridWidthRel + constructGapWidthRel) * 1000,
         y: offsetTop * 1000 + (constructWeekHeightRel * 1000) / 10 + ((constructWeekHeightRel * 1000) / 5) * i,
         weekNr: numberOfFirstWeekThisMonth + i,
      });
   }

   arr.forEach((element) => {
      let text = document.createElementNS("http://www.w3.org/2000/svg", "text");

      text.setAttribute("x", String(element.x));
      text.setAttribute("y", String(element.y));
      text.setAttribute("text-anchor", "middle");
      text.classList.add("color-text-weekday");
      text.setAttribute("font-size", String(fontSize));
      text.setAttribute("letter-spacing", 2);
      text.setAttribute("transform", `rotate(-90 ${element.x} ${element.y})`);
      text.setAttribute("dominant-baseline", "middle");

      text.textContent = languages.find((language) => language.lng == "JP").week + " " + String(element.weekNr).padStart(2, "0");

      svg.append(text);
   });
}

createDayNumberArray();
function createDayNumberArray() {
   const arr = [];
   let obj;

   const numberOfDaysInThisMonth = new Date(year, currentMonth + 1, 0).getDate();
   const numberOfDaysInLastMonth = new Date(year, currentMonth, 0).getDate();
   const endWeekDayLastMonth = new Date(year, currentMonth, 0).getDay();
   const startWeekDayThisMonth = new Date(year, currentMonth, 1).getDay();

   let startWeekDayLastMonth;
   if (startWeekDayThisMonth >= 0) startWeekDayLastMonth = numberOfDaysInLastMonth - (startWeekDayThisMonth - 1);
   else startWeekDayLastMonth = null;

   let startPanelNextMonth;
   if (startWeekDayThisMonth < 12) startPanelNextMonth = numberOfDaysInThisMonth + startWeekDayThisMonth;
   else startPanelNextMonth = null;

   let lastPanelLastMonth = numberOfDaysInLastMonth;
   const fontSize = 30;
   const fontOffsetX = 10;
   const fontOffsetY = 20;
   console.log("numberOfDaysInThisMonth", numberOfDaysInThisMonth);
   console.log("numberOfDaysInLastMonth", numberOfDaysInLastMonth);
   console.log("endWeekDayLastMonth", endWeekDayLastMonth);
   console.log("startWeekDayLastMonth", startWeekDayLastMonth);
   console.log("startWeekDayThisMonth", startWeekDayThisMonth);
   console.log("startPanelNextMonth", startPanelNextMonth);

   // create array
   for (let i = 0; i < 35; i++) {
      if (i < startWeekDayThisMonth) {
         obj = { dayNr: String(startWeekDayLastMonth + i) };
      } else if (i < numberOfDaysInThisMonth + startWeekDayThisMonth) {
         obj = { dayNr: String(i - startWeekDayThisMonth + 1).padStart(2, "0") };
      } else {
         obj = { dayNr: String(i + 1 - startPanelNextMonth).padStart(2, "0") };
      }

      obj.panel = i + 1;
      obj.x = fontOffsetX + (constructTotalDayGridWidthRel / 7) * 1000 * (i % 7);
      obj.y = fontOffsetY + fontSize + offsetTop * 1000 + (constructTotalDayGridHeightRel / 5) * 1000 * Math.floor(i / 7);
      if (i % 7 < 1 || i % 7 == 6) obj.isColored = true;
      else obj.isColored = false;

      arr.push(obj);
   }

   arr.forEach((element) => {
      let text = document.createElementNS("http://www.w3.org/2000/svg", "text");

      text.setAttribute("x", String(element.x));
      text.setAttribute("y", String(element.y));
      text.setAttribute("text-anchor", "left");
      text.classList.add(`color-text-${element.isColored ? "holiday" : "weekday"}`);
      text.setAttribute("font-size", "40");
      text.setAttribute("letter-spacing", 2);
      text.textContent = element.dayNr;
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

   return arr;
}

testArray__Lines.forEach((element) => {
   line = document.createElementNS("http://www.w3.org/2000/svg", "line");
   line.setAttribute("x1", String(element.x1));
   line.setAttribute("y1", String(element.y1));
   line.setAttribute("x2", String(element.x2));
   line.setAttribute("y2", String(element.y2));
   line.setAttribute("stroke", element.sc);
   line.setAttribute("stroke-width", String(element.sw));
   line.classList.add("color-line-weekday");
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
