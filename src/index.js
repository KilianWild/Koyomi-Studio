//import hexToHsl from "../node_modules/hex-to-hsl/index.js";
import jsPDF from "jspdf";
import { normalize } from "../utils/utils.js";
import domtoimage from "dom-to-image";

// <-- Global Variables :  -->
let selectedYear = 0;
let selectedMonth = 0;
let selectedNrOfMonths = 0;
let selectedPrintMargin = 0;

const root = document.documentElement;

const koyomiStudioForm = document.querySelector('[data-js="koyomi-studio_form"]');
const koyomiStudioContainer = document.querySelector('[data-js="koyomi-studio__container"]');
const koyomiStudioTitle = document.querySelector('[data-js="title"]');
const koyomiBuilderMainSection = document.querySelector('[data-js="koyomi-main"]');

const koyomiBuilderButtons = document.querySelector('[data-js="buttom-buttons"]');
const koyomiBuilderButton_Print = document.querySelector('[data-js="button-print-pdf"]');
const koyomiBuilderButton_Back = document.querySelector('[data-js="button-back"]');

const koyomiStudioSetting_InputYear = document.querySelector('[data-js="form-inputYear"]');

const allButtons = document.querySelectorAll("button");

const todaysDate = new Date();

const COORDINATE_SCALE = 1000;
const ROWS = 5;
const COLUMNS = 7;

let numberOfDaysInThisMonth;
let numberOfDaysInLastMonth;
let endWeekDayLastMonth;
let startWeekDayThisMonth;
let startWeekDayNextMonth;

let startWeekDayLastMonth;

let startPanelNextMonth;
let selectedFirstWeekday;

let weekdaynrSunday;
let weekdaynrSaturday;

let calendarColorHEX;
let calendarColorLHCArray = [];
let calendarColorLHCArrayDarker = [];

let koyomiBuilderContainerArray = [];

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
      /*
      month_0: "一月 - January",
      month_1: "二月 - February",
      month_2: "三月 - March",
      month_3: "四月 - April",
      month_4: "五月 - May",
      month_5: "六月 - June",
      month_6: "七月 - July",
      month_7: "八月 - August",
      month_8: "九月 - September",
      month_9: "十月 - October",
      month_10: "十一月 - November",
      month_11: "十二月 - December",
      */
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
const constructTotalDayGridWidthRel = 0.96; //0.96;
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

const dayColumnWidthRel = constructTotalDayGridWidthRel / 7;
const dayRowHightRel = constructTotalDayGridHeightRel / 5;

// --< colors >--

let year = null;
let currentMonth = null;

let lockUserInteraction = false;

/*

const inputField_colorHueNumber = document.querySelector('[data-js="colorHueNumber"]');
const inputField_colorHueRange = document.querySelector('[data-js="colorHueRange"]');

const inputField_cweekendColorFadeNumber = document.querySelector('[data-js="colorFadeNumber"]');
const inputField_weekendColorFadeRange = document.querySelector('[data-js="colorFadeRange"]');

const inputField_colorSaturationNumber = document.querySelector('[data-js="colorSatNumber"]');
const inputField_colorSaturationRange = document.querySelector('[data-js="colorSatRange"]');




const computedStyles = getComputedStyle(root);
let cssColorArray_themeTrueColor = hexToHsl(computedStyles.getPropertyValue("--color-theme-true-color"));
let cssColorArray_theme = hexToHsl(computedStyles.getPropertyValue("--color-theme"));
let cssColorArray_themeHightLight = hexToHsl(computedStyles.getPropertyValue("--color-theme-hightlight"));
let cssColorArray_holiday = hexToHsl(computedStyles.getPropertyValue("--color-holiday"));
let cssColorArray_holidayFaded = hexToHsl(computedStyles.getPropertyValue("--color-holiday-faded"));
let cssColorArray_weekday = hexToHsl(computedStyles.getPropertyValue("--color-weekday"));
let cssColorArray_weekdayFaded = hexToHsl(computedStyles.getPropertyValue("--color-weekday-faded"));
// --< calc color theme "true color" - css fixed!>--

// --< calc color theme >--
cssColorArray_theme = [...cssColorArray_themeTrueColor];
cssColorArray_theme[2] = cssColorArray_themeTrueColor[2] - 10 > 0 ? cssColorArray_themeTrueColor[2] - 10 : 0;
root.style.setProperty("--color-theme", `hsl(${cssColorArray_theme[0]}, ${cssColorArray_theme[1]}%, ${cssColorArray_theme[2]}%)`);

// --< calc color theme >--
cssColorArray_themeHightLight = [...cssColorArray_themeTrueColor];
cssColorArray_themeHightLight[2] = cssColorArray_themeTrueColor[2] + 10 < 50 ? cssColorArray_themeTrueColor[2] + 10 : 50;
root.style.setProperty(
   "--color-theme-hightlight",
   `hsl(${cssColorArray_theme[0]}, ${cssColorArray_theme[1]}%, ${cssColorArray_theme[2]}%)`,
);

// --< calc color holiday >--
cssColorArray_holiday = [...cssColorArray_theme];
root.style.setProperty(
   "--color-holiday",
   `hsl(${cssColorArray_holiday[0]}, ${cssColorArray_holiday[1]}%, ${cssColorArray_holiday[2]}%)`,
);

//-----------------------------------------------------------------------------------------------
// --< calc color holiday faded >--
cssColorArray_holidayFaded = [...cssColorArray_holiday];
cssColorArray_holidayFaded[2] = cssColorArray_holidayFaded[2] - 25 > 10 ? cssColorArray_holidayFaded[2] - 25 : 10;
root.style.setProperty(
   "--color-holiday-faded",
   `hsl(${cssColorArray_holidayFaded[0]}, ${cssColorArray_holidayFaded[1]}%, ${cssColorArray_holidayFaded[2]}%)`,
);

// --< calc color weekday = css fixed! >--
cssColorArray_weekday[0] = 0;
cssColorArray_weekday[1] = 0;
root.style.setProperty(
   "--color-weekday",
   `hsl(${cssColorArray_weekday[0]}, ${cssColorArray_weekday[1]}%, ${cssColorArray_weekday[2]}%)`,
);

// --< calc color weekday faded >--
cssColorArray_weekdayFaded = [...cssColorArray_weekday];
cssColorArray_weekdayFaded[2] = cssColorArray_weekdayFaded[2] - 25 > 10 ? cssColorArray_weekdayFaded[2] - 25 : 10;
root.style.setProperty(
   "--color-weekday-faded",
   `hsl(${cssColorArray_weekdayFaded[0]}, ${cssColorArray_weekdayFaded[1]}%, ${cssColorArray_weekdayFaded[2]}%)`,
);


*/

koyomiStudioSetting_InputYear.value = todaysDate.getFullYear();
const koyomiStudioSetting_InputMonth = document.querySelector('[data-js="form-inputMonth"]');
koyomiStudioSetting_InputMonth.value = todaysDate.getMonth() + 1;
let selectedPageSize = "";

// <-- koyomi studio submit - read settings -
koyomiStudioForm.addEventListener("submit", (event) => {
   event.preventDefault();

   selectedYear = event.target.elements.inputYear.value;
   selectedMonth = event.target.elements.inputStartMonth.value;
   selectedNrOfMonths = event.target.elements.inputNrOfMonth.value;
   selectedFirstWeekday = event.target.elements.inputFirstWeekday.value;
   selectedPrintMargin = event.target.elements.inputPrintMargin.value;

   selectedPageSize = "A4"; // event.target.elements.inputPaperSize.value;
   const selectedLanguage = event.target.elements.inputLanguage.value;
   //calendarColorHEX = event.target.elements.inputColor.value;

   /*
   console.log("selectedPageSize, ", selectedPageSize);
   const sheet = new CSSStyleSheet();
   sheet.replaceSync(`
      @page {
         size: ${selectedPageSize} landscape;
         margin: 0;
   }`);
   document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];
*/

   koyomiStudioContainer.classList.remove("koyomi-studio__container--active");
   koyomiStudioTitle.classList.add("koyomi-studio-title--translateY");

   koyomiBuilderButtons.classList.add("koyomi-builder__bottom-buttons--active");
   const koyomiBuilderButton_Back = document.querySelector('[data-js="button-back"]');

   // --< set page size
   switch (selectedPageSize) {
      case "A5":
         root.style.setProperty("--page-size-height", "148mm");
         root.style.setProperty("--page-size-width", "210mm");
         break;
      case "A4":
         root.style.setProperty("--page-size-height", "210mm");
         root.style.setProperty("--page-size-width", "297mm");
         break;
      case "A3":
         root.style.setProperty("--page-size-height", "297mm");
         root.style.setProperty("--page-size-width", "420mm");
         break;
   }

   const computedStyles = getComputedStyle(root);
   let a = computedStyles.getPropertyValue("--page-size-height");
   let b = computedStyles.getPropertyValue("--page-size-width");

   root.style.setProperty("--print-margin", selectedPrintMargin + "mm");

   koyomiBuilderMainSection.classList.add("koyomi-builder__month-collection-container--active");

   for (let monthIndex = 0; monthIndex < selectedNrOfMonths; monthIndex++) {
      currentMonth = selectedMonth - 1 + monthIndex; //0 == January

      year = currentMonth > 11 ? selectedYear + 1 : selectedYear;

      weekdaynrSunday = (6 - selectedFirstWeekday + 1) % 7;
      weekdaynrSaturday = (6 - selectedFirstWeekday) % 7;

      numberOfDaysInThisMonth = new Date(year, currentMonth + 1, 0).getDate();
      numberOfDaysInLastMonth = new Date(year, currentMonth, 0).getDate();
      endWeekDayLastMonth = new Date(year, currentMonth, 0).getDay();
      startWeekDayThisMonth = new Date(year, currentMonth, 1).getDay();
      startWeekDayNextMonth = new Date(year, currentMonth + 1, 1).getDay();

      endWeekDayLastMonth = (endWeekDayLastMonth - selectedFirstWeekday - 1 + 7) % 7;
      startWeekDayThisMonth = (startWeekDayThisMonth - selectedFirstWeekday - 1 + 7) % 7;
      startWeekDayNextMonth = (startWeekDayNextMonth - selectedFirstWeekday - 1 + 7) % 7;
      startWeekDayLastMonth = numberOfDaysInLastMonth - (startWeekDayThisMonth - 1);
      startPanelNextMonth = numberOfDaysInThisMonth + startWeekDayThisMonth;

      // --< color holiday >--

      /*
   root.style.setProperty(
      "--color-holiday",
      `hsl(${cssColorArray_holiday[0]}, ${cssColorArray_holiday[1]}%, ${cssColorArray_holiday[2]}%)`,
   );
*/
      // --< color holiday faded >--

      // start build. . .

      koyomiBuilderContainerArray.push(svgbuilder(monthIndex, selectedLanguage));

      koyomiBuilderButton_Print.removeAttribute("disabled");
      koyomiBuilderButton_Back.removeAttribute("disabled");
   }
});

koyomiBuilderButton_Back.addEventListener("click", async () => {
   koyomiStudioContainer.classList.add("koyomi-studio__container--active");
   koyomiStudioTitle.classList.remove("koyomi-studio-title--translateY");

   koyomiBuilderButtons.classList.remove("koyomi-builder__bottom-buttons--active");
   koyomiBuilderMainSection.classList.remove("koyomi-builder__month-collection-container--active");

   await new Promise((resolve) => setTimeout(resolve, 1000));

   koyomiBuilderContainerArray.forEach((koyomiBuilderContainer) => {
      koyomiBuilderContainer.remove();
   });

   koyomiBuilderButton_Print.setAttribute("disabled", "");
   koyomiBuilderButton_Back.setAttribute("disabled", "");
});

koyomiBuilderButton_Print.addEventListener("click", async () => {
   //domToImgElement.classList.remove("koyomi-builder__print-sizing--for-browser");
   koyomiBuilderMainSection.classList.remove("koyomi-builder__month-collection-container--active");
   const loaders = document.querySelectorAll('[data-js="koyomi-loader"]');
   const pages = document.querySelectorAll('[data-js="dom-to-img-container"]');
   const spanLoadedPages = document.querySelector('[data-js="koyomi-loader-page-x"]');
   const spanpagesToLoad = document.querySelector('[data-js="koyomi-loader-page-of-x"]');
   const loaderText = document.querySelector('[data-js="koyomi-loader-text"]');

   spanpagesToLoad.textContent = pages.length;

   loaders.forEach((loader) => {
      loader.classList.add("visible");
   });
   loaderText.classList.add("visible");

   allButtons.forEach((button) => {
      button.setAttribute("disabled", "");
   });

   await new Promise((resolve) => setTimeout(resolve, 1000));

   const svgObjects = document.querySelectorAll('[data-js="svg-object"]');
   svgObjects.forEach((svgObject) => {
      svgObject.classList.add("print-version");
   });

   const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
   });

   const scale = 3;

   for (let i = 0; i < pages.length; i++) {
      spanLoadedPages.textContent = i + 1;
      try {
         const dataUrl = await domtoimage.toPng(pages[i], {
            width: pages[i].offsetWidth * scale,
            height: pages[i].offsetHeight * scale,
            style: {
               transform: `scale(${scale})`,
               transformOrigin: "top left",
            },
         });

         const pdfWidth = 297;
         const pdfHeight = 210;

         const img = await loadImage(dataUrl);

         if (i > 0) doc.addPage();

         doc.addImage(img, "PNG", 0, 0, pdfWidth, pdfHeight, undefined, "FAST");
      } catch (error) {
         console.error("error creating pdf page!!", error);
      }
   }

   doc.save(
      `Koyomi-${selectedYear}-${
         languages.find((language) => language.lng == "EN")[`month_${selectedMonth}`]
      }_${selectedNrOfMonths == 12 ? "One-Year" : selectedNrOfMonths > 1 ? selectedNrOfMonths + "-Months" : "1-Month"}.pdf`,
   );

   allButtons.forEach((button) => {
      button.removeAttribute("disabled");
   });
   svgObjects.forEach((svgObject) => {
      svgObject.classList.remove("print-version");
   });
   loaders.forEach((loader) => {
      loader.classList.remove("visible");
   });
   loaderText.classList.remove("visible");
   koyomiBuilderMainSection.classList.add("koyomi-builder__month-collection-container--active");

   function loadImage(src) {
      return new Promise((resolve, reject) => {
         const img = new Image();
         img.src = src;
         img.onload = () => resolve(img);
         img.onerror = reject;
      });
   }
});

/*
   const svg = document.querySelector("svg"); // your SVG element
   const selectedPageSize = "A4"; // or "A3"/"A5"

   const pdfWidth = selectedPageSize === "A3" ? 420 : selectedPageSize === "A4" ? 297 : 210;
   const pdfHeight = selectedPageSize === "A3" ? 297 : selectedPageSize === "A4" ? 210 : 148;

   const doc = new jsPDF({
      orientation: pdfWidth > pdfHeight ? "landscape" : "portrait",
      unit: "mm",
      format: selectedPageSize,
   });

   // scale SVG to fit PDF page
   svg2pdf(svg, doc, {
      xOffset: 0,
      yOffset: 0,
      scale: pdfWidth / svg.viewBox.baseVal.width,
   });

   doc.save("output.pdf");*/

/*

// --< init range slider >--
inputField_colorHueNumber.value = cssColorArray_themeTrueColor[0];
inputField_colorHueRange.value = cssColorArray_themeTrueColor[0];

inputField_colorSaturationNumber.value = cssColorArray_themeTrueColor[1];
inputField_colorSaturationRange.value = cssColorArray_themeTrueColor[1];

inputField_cweekendColorFadeNumber.value = cssColorArray_weekdayFaded[2];
inputField_weekendColorFadeRange.value = cssColorArray_weekdayFaded[2];

inputField_colorHueRange.addEventListener("input", (event) => {
   let selectedHue = event.target.value;
   inputField_colorHueNumber.value = selectedHue;

   // --< color hue >--
   cssColorArray_themeTrueColor[0] = selectedHue;
   cssColorArray_holidayFaded[0] = selectedHue;
   cssColorArray_theme[0] = selectedHue;
   cssColorArray_themeHightLight[0] = selectedHue;

   root.style.setProperty(
      "--color-theme-true-color",
      `hsl(${cssColorArray_themeTrueColor[0]}, ${cssColorArray_themeTrueColor[1]}%, ${cssColorArray_themeTrueColor[2]}%)`,
   );

   root.style.setProperty(
      "--color-holiday-faded",
      `hsl(${cssColorArray_holidayFaded[0]}, ${cssColorArray_holidayFaded[1]}%, ${cssColorArray_holidayFaded[2]}%)`,
   );

   cssColorArray_theme[1] = cssColorArray_themeTrueColor[1] - 10 > 0 ? cssColorArray_themeTrueColor[1] - 10 : 0;
   root.style.setProperty(
      "--color-theme",
      `hsl(${cssColorArray_theme[0]}, ${cssColorArray_theme[1]}%, ${cssColorArray_theme[2]}%)`,
   );
   cssColorArray_themeHightLight[1] = cssColorArray_themeTrueColor[1] + 10 < 50 ? cssColorArray_themeTrueColor[1] + 10 : 50;
   root.style.setProperty(
      "--color-theme-hightlight",
      `hsl(${cssColorArray_themeHightLight[0]}, ${cssColorArray_themeHightLight[1]}%, ${cssColorArray_themeHightLight[2]}%)`,
   );
});

inputField_colorHueNumber.addEventListener("input", (event) => {
   let selectedHue = event.target.value;
   inputField_colorHueRange.value = selectedHue;

   // --< color hue >--
   cssColorArray_themeTrueColor[0] = selectedHue;
   cssColorArray_holidayFaded[0] = selectedHue;

   root.style.setProperty(
      "--color-theme-true-color",
      `hsl(${cssColorArray_themeTrueColor[0]}, ${cssColorArray_themeTrueColor[1]}%, ${cssColorArray_themeTrueColor[2]}%)`,
   );
   root.style.setProperty(
      "--color-holiday-faded",
      `hsl(${cssColorArray_holidayFaded[0]}, ${cssColorArray_holidayFaded[1]}%, ${cssColorArray_holidayFaded[2]}%)`,
   );
});

inputField_colorSaturationRange.addEventListener("input", (event) => {
   let selectedSaturation = event.target.value;
   inputField_colorSaturationNumber.value = selectedSaturation;

   // --< color fade >--
   cssColorArray_themeTrueColor[1] = selectedSaturation;

   root.style.setProperty(
      "--color-theme-true-color",
      `hsl(${cssColorArray_themeTrueColor[0]}, ${cssColorArray_themeTrueColor[1]}%, ${cssColorArray_themeTrueColor[2]}%)`,
   );
});

inputField_colorSaturationNumber.addEventListener("input", (event) => {
   let selectedSaturation = event.target.value;
   inputField_colorSaturationRange.value = selectedSaturation;

   // --< color fade >--
   cssColorArray_themeTrueColor[1] = selectedSaturation;

   root.style.setProperty(
      "--color-theme-true-color",
      `hsl(${cssColorArray_themeTrueColor[0]}, ${cssColorArray_themeTrueColor[1]}%, ${cssColorArray_themeTrueColor[2]}%)`,
   );
});

inputField_weekendColorFadeRange.addEventListener("input", (event) => {
   let selectedFade = event.target.value;
   inputField_cweekendColorFadeNumber.value = selectedFade;

   // --< color fade >--
   cssColorArray_weekdayFaded[2] = selectedFade;
   cssColorArray_holidayFaded[2] = selectedFade;

   root.style.setProperty(
      "--color-weekday-faded",
      `hsl(${cssColorArray_weekdayFaded[0]}, ${cssColorArray_weekdayFaded[1]}%, ${cssColorArray_weekdayFaded[2]}%)`,
   );
   root.style.setProperty(
      "--color-holiday-faded",
      `hsl(${cssColorArray_holidayFaded[0]}, ${cssColorArray_holidayFaded[1]}%, ${cssColorArray_holidayFaded[2]}%)`,
   );
});

inputField_cweekendColorFadeNumber.addEventListener("input", (event) => {
   let selectedFade = event.target.value;
   inputField_weekendColorFadeRange.value = selectedFade;

   // --< color fade >--
   cssColorArray_weekdayFaded[1] = selectedFade;
   cssColorArray_holidayFaded[1] = selectedFade;

   root.style.setProperty(
      "--color-weekday-faded",
      `hsl(${cssColorArray_weekdayFaded[0]}, ${cssColorArray_weekdayFaded[1]}%, ${cssColorArray_weekdayFaded[2]}%)`,
   );
   root.style.setProperty(
      "--color-holiday-faded",
      `hsl(${cssColorArray_holidayFaded[0]}, ${cssColorArray_holidayFaded[1]}%, ${cssColorArray_holidayFaded[2]}%)`,
   );
});

*/

// <-- koyomi studio submit - read settings -
// <----------------------------------------------
function svgbuilder(monthIndex, selectedLanguage) {
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

   //const screenWrapper = document.querySelector(`[data-js="screen-wrapper"]`);

   let koyomiBuilderContainer = document.createElement("section");
   koyomiBuilderContainer.innerHTML = `   
   <section class="koyomi-builder__container" data-js="koyomi-builder__container">
      <div class="koyomi-builder__print-sizing koyomi-builder__print-sizing--for-browser" data-js="print-sizing">
         <div class="dom-to-img-container" data-js="dom-to-img-container">
            <div class="koyomi-builder__print-margin">
               <svg viewBox="0 0 1000 1000" preserveAspectRatio="none" data-js="svg${monthIndex}"></svg>
            </div>
         </div>
      </div>
   </section>
   `;

   koyomiBuilderMainSection.append(koyomiBuilderContainer);

   const svg = document.querySelector(`[data-js="svg${monthIndex}"]`);

   createFlavorText(svg, selectedLanguage);
   createHEaderLine(svg);
   createMonthHeader(svg, selectedLanguage);
   createWeekNumberArray(svg, selectedLanguage);
   createDayNameArray(svg, selectedLanguage);
   createDayNumberArray(svg);
   createLinesArray(svg);

   return koyomiBuilderContainer;
}

// August 2021

function createFlavorText(svg, selectedLanguage) {
   let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
   text.setAttribute("x", "10");
   text.setAttribute("y", "680");
   text.setAttribute("text-anchor", "start");
   text.classList.add("color-text-weekday");
   text.setAttribute("font-size", "16");
   text.setAttribute("letter-spacing", 4);
   text.setAttribute("data-js", "svg-object");
   text.textContent = "カレンダー";

   svg.append(text);
   text = document.createElementNS("http://www.w3.org/2000/svg", "text");
   text.setAttribute("x", "990");
   text.setAttribute("y", "680");
   text.setAttribute("text-anchor", "end");
   text.classList.add("color-text-weekday");
   text.setAttribute("font-size", "16");
   text.setAttribute("letter-spacing", 4);
   text.setAttribute("data-js", "svg-object");
   text.textContent = languages.find((language) => language.lng == selectedLanguage).year + " " + year;

   svg.append(text);
}

function createHEaderLine(svg) {
   let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
   line.setAttribute("x1", "0");
   line.setAttribute("y1", "40");
   line.setAttribute("x2", "960");
   line.setAttribute("y2", "40");
   line.classList.add("color-line-weekday");
   line.setAttribute("stroke-width", "0.5");
   line.setAttribute("data-js", "svg-object");

   svg.append(line);
}

function createMonthHeader(svg, selectedLanguage) {
   let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
   text.setAttribute("x", "480");
   text.setAttribute("y", "25");
   text.setAttribute("text-anchor", "middle");
   text.classList.add("color-text-weekday");
   text.setAttribute("font-size", "30");
   text.setAttribute("letter-spacing", 7);
   text.setAttribute("data-js", "svg-object");
   text.textContent = languages.find((language) => language.lng == selectedLanguage)[`month_${currentMonth}`];
   svg.append(text);
}

function createDayNameArray(svg, selectedLanguage) {
   const arr = [];
   let obj;
   const fontSize = 18;
   for (let h = 0; h < COLUMNS; h++) {
      obj = {
         panel: h + 1,
         x: 30 + dayColumnWidthRel * COORDINATE_SCALE * h,
         y:
            2 +
            offsetTop * COORDINATE_SCALE +
            (constructTotalDayGridHeightRel + constructDayLabelHeightRel / 2 + constructGapHeightRel) * COORDINATE_SCALE,
      };

      if (h % COLUMNS == weekdaynrSaturday || h % COLUMNS == weekdaynrSunday) obj.isColored = true;
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
      text.setAttribute("data-js", "svg-object");

      text.textContent =
         languages.find((language) => language.lng == selectedLanguage)[
            `weekday_${(index - startWeekDayThisMonth - 1 + 7) % 7}`
         ] + ".";

      svg.append(text);
   });
}

function createWeekNumberArray(svg, selectedLanguage) {
   const arr = [];
   const numberOfFirstWeekThisMonth = (currentMonth - 1) * 4;
   const fontSize = 18;

   for (let v = 0; v < ROWS; v++) {
      arr.push({
         panel: v + 1,
         x:
            2 +
            (constructWeekWidthRel * COORDINATE_SCALE) / 2 +
            (constructTotalDayGridWidthRel + constructGapWidthRel) * COORDINATE_SCALE,
         y:
            offsetTop * COORDINATE_SCALE +
            (constructWeekHeightRel * COORDINATE_SCALE) / 10 +
            dayRowHightRel * COORDINATE_SCALE * v,
         weekNr: numberOfFirstWeekThisMonth + 1 + v,
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
      text.setAttribute("data-js", "svg-object");

      text.textContent =
         languages.find((language) => language.lng == selectedLanguage).week + " " + String(element.weekNr).padStart(2, "0");

      svg.append(text);
   });
}

function createDayNumberArray(svg) {
   const arr = [];
   let obj;

   const fontSize = 34;
   const fontOffsetX = 10;
   const fontOffsetY = 6;

   for (let i = 0; i < 35; i++) {
      if (i < startWeekDayThisMonth) {
         obj = { dayNr: String(startWeekDayLastMonth + i), isFaded: true };
      } else if (i < numberOfDaysInThisMonth + startWeekDayThisMonth) {
         obj = { dayNr: String(i - startWeekDayThisMonth + 1).padStart(2, "0"), isFaded: false };
      } else {
         obj = { dayNr: String(i + 1 - startPanelNextMonth).padStart(2, "0"), isFaded: true };
      }

      obj.panel = i + 1;
      obj.x = fontOffsetX + dayColumnWidthRel * COORDINATE_SCALE * (i % COLUMNS);
      obj.y = fontOffsetY + fontSize + offsetTop * COORDINATE_SCALE + dayRowHightRel * COORDINATE_SCALE * Math.floor(i / COLUMNS);
      if (i % COLUMNS == weekdaynrSaturday || i % COLUMNS == weekdaynrSunday) obj.isColored = true;
      else obj.isColored = false;

      arr.push(obj);
   }

   arr.forEach((element, index) => {
      let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.setAttribute("x", String(element.x));
      text.setAttribute("y", String(element.y));
      text.setAttribute("text-anchor", "left");
      text.classList.add(
         `color-text-${element.isColored ? `holiday${element.isFaded ? "-faded" : ""}` : `weekday${element.isFaded ? "-faded" : ""}`}`,
      );
      text.setAttribute("font-size", String(fontSize));
      text.setAttribute("letter-spacing", 2);
      text.setAttribute("data-js", "svg-object");
      text.textContent = element.dayNr;
      svg.append(text);
   });
}

function createLinesArray(svg) {
   const totalWidthPercent = 0.96;
   const arr = [];
   let obj;
   let line;

   // --< calc horizontal day-grid lines >--
   for (let v = 0; v <= ROWS; v++) {
      // --< vertical offest
      let yOffset = dayRowHightRel * COORDINATE_SCALE * v;
      for (let h = 0; h < COLUMNS; h++) {
         // --< horizontal offest
         obj = {
            id: h,
            x1: dayColumnWidthRel * COORDINATE_SCALE * h,
            x2: dayColumnWidthRel * COORDINATE_SCALE * h + dayColumnWidthRel * COORDINATE_SCALE,
            y1: 50 + yOffset,
            y2: 50 + yOffset,
            sw: 0.5,
         };

         // --< fade out previous and next month

         obj.isFaded =
            (v == 0 && h < startWeekDayThisMonth) || (v == ROWS && h >= startWeekDayNextMonth && startPanelNextMonth <= 35)
               ? true
               : false;
         arr.push(obj);
      }
   }

   // --< calc vertical day-grid lines >--
   for (let h = 0; h <= COLUMNS; h++) {
      // --< horizontal offest
      let xOffset = dayColumnWidthRel * COORDINATE_SCALE * h;
      for (let v = 0; v < ROWS; v++) {
         // --< vertical offest
         obj = {
            id: v,
            x1: xOffset,
            x2: xOffset,
            y1: offsetTop * COORDINATE_SCALE + dayRowHightRel * COORDINATE_SCALE * v,
            y2: offsetTop * COORDINATE_SCALE + dayRowHightRel * COORDINATE_SCALE * v + dayRowHightRel * COORDINATE_SCALE,
            sc: "red",
            sw: 0.5,
         };
         // --< fade out previous and next month
         obj.isFaded =
            (v == 0 && h < startWeekDayThisMonth) ||
            (v == ROWS - 1 && (h > startWeekDayNextMonth || startWeekDayNextMonth == 0) && startPanelNextMonth <= 35)
               ? true
               : false;

         arr.push(obj);
      }
   }

   // --< calc horizontal daylable-grid lines >--
   for (let v = 0; v <= 1; v++) {
      // --< vertical offest
      let yOffset = (constructDayLabelHeightRel / 1) * COORDINATE_SCALE * v;
      for (let h = 0; h < COLUMNS; h++) {
         // --< horizontal offest
         arr.push({
            id: h,
            x1: dayColumnWidthRel * COORDINATE_SCALE * h,
            x2: dayColumnWidthRel * COORDINATE_SCALE * h + dayColumnWidthRel * COORDINATE_SCALE,
            y1:
               offsetTop * COORDINATE_SCALE +
               constructTotalDayGridHeightRel * COORDINATE_SCALE +
               constructGapHeightRel * COORDINATE_SCALE +
               yOffset,
            y2:
               offsetTop * COORDINATE_SCALE +
               constructTotalDayGridHeightRel * COORDINATE_SCALE +
               constructGapHeightRel * COORDINATE_SCALE +
               yOffset,
            sc: "red",
            sw: 0.5,
         });
      }
   }

   // --< calc vertical day-grid lines >--
   for (let h = 0; h <= COLUMNS; h++) {
      // --< horizontal offest
      let xOffset = dayColumnWidthRel * COORDINATE_SCALE * h;
      for (let v = 0; v < 1; v++) {
         // --< vertical offest
         arr.push({
            id: v,
            x1: xOffset,
            x2: xOffset,
            y1:
               offsetTop * COORDINATE_SCALE +
               constructTotalDayGridHeightRel * COORDINATE_SCALE +
               constructGapHeightRel * COORDINATE_SCALE +
               (constructDayLabelHeightRel / 1) * COORDINATE_SCALE * v,
            y2:
               offsetTop * COORDINATE_SCALE +
               constructTotalDayGridHeightRel * COORDINATE_SCALE +
               constructGapHeightRel * COORDINATE_SCALE +
               (constructDayLabelHeightRel / 1) * COORDINATE_SCALE * v +
               (constructDayLabelHeightRel / 1) * COORDINATE_SCALE,
            sc: "red",
            sw: 0.5,
         });
      }
   }

   // --< calc horizontal week-grid lines >--
   for (let v = 0; v <= ROWS; v++) {
      // --< vertical offest
      let yOffset = (constructWeekHeightRel / 5) * COORDINATE_SCALE * v;
      for (let h = 0; h < 1; h++) {
         // --< horizontal offest
         arr.push({
            id: h,
            x1:
               constructTotalDayGridWidthRel * COORDINATE_SCALE +
               constructGapWidthRel * COORDINATE_SCALE +
               (constructWeekWidthRel / 1) * COORDINATE_SCALE * h,
            x2:
               constructTotalDayGridWidthRel * COORDINATE_SCALE +
               constructGapWidthRel * COORDINATE_SCALE +
               (constructWeekWidthRel / 1) * COORDINATE_SCALE * h +
               (constructWeekWidthRel / 1) * COORDINATE_SCALE,
            y1: offsetTop * COORDINATE_SCALE + yOffset,
            y2: offsetTop * COORDINATE_SCALE + yOffset,
            sc: "red",
            sw: 0.5,
         });
      }
   }

   // --< calc vertical week-grid lines >--
   for (let v = 0; v <= 1; v++) {
      // --< horizontal offest
      let xOffset = (constructWeekWidthRel / 1) * COORDINATE_SCALE * v - 0.5; // -1 becasue of  end of div
      for (let h = 0; h < COLUMNS; h++) {
         // --< vertical offest
         arr.push({
            id: h,
            x1: constructTotalDayGridWidthRel * COORDINATE_SCALE + constructGapWidthRel * COORDINATE_SCALE + xOffset,
            x2: constructTotalDayGridWidthRel * COORDINATE_SCALE + constructGapWidthRel * COORDINATE_SCALE + xOffset,
            y1: offsetTop * COORDINATE_SCALE + (constructWeekHeightRel / 7) * COORDINATE_SCALE * h,
            y2:
               offsetTop * COORDINATE_SCALE +
               (constructWeekHeightRel / 7) * COORDINATE_SCALE * h +
               (constructWeekHeightRel / 7) * COORDINATE_SCALE,
            sc: "red",
            sw: 0.5,
         });
      }
   }

   arr.forEach((element) => {
      line = document.createElementNS("http://www.w3.org/2000/svg", "line");

      // --< if vertical line:
      if (element.x1 === element.x2) {
         line.setAttribute("x1", String(element.x1));
         line.setAttribute("x2", String(element.x2));

         if (Math.random() < 0.5) {
            line.setAttribute("y1", String(element.y1));
            line.setAttribute("y2", String(element.y2));
         } else {
            line.setAttribute("y1", String(element.y2));
            line.setAttribute("y2", String(element.y1));
         }
      } else if (element.y1 === element.y2) {
         line.setAttribute("y1", String(element.y1));
         line.setAttribute("y2", String(element.y2));

         if (Math.random() < 0.5) {
            line.setAttribute("x1", String(element.x1));
            line.setAttribute("x2", String(element.x2));
         } else {
            line.setAttribute("x1", String(element.x2));
            line.setAttribute("x2", String(element.x1));
         }
      }

      //line.setAttribute("stroke", element.sc);
      line.setAttribute("stroke-width", String(element.sw));
      line.classList.add(element.isFaded ? "color-line-weekday-faded" : "color-line-weekday");
      line.setAttribute("data-js", "svg-object");

      svg.append(line);

      // Animate the line
      const length = line.getTotalLength();
      line.style.strokeDasharray = length;
      line.style.strokeDashoffset = length;

      // Trigger animation via CSS
      line.style.animation = "drawLine 2s ease forwards";
   });

   return arr;
}

function arrayShuffle(arr) {
   let a = [...arr];
   for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
   }
   return a;
}
