let weekNumber = require("current-week-number");

export function whichWeek(datestring) {
  let currentMonth = new Date(datestring).getMonth() + 1;
  let currentDate = new Date(datestring).getDate();
  let currentYear = new Date(datestring).getFullYear();
  let concatMDY = `${currentMonth}/${currentDate}/${currentYear}`;
  let whichWeekNumber = weekNumber(concatMDY);
  return whichWeekNumber;
}

export function currentWeek() {
  let weekNumber = require("current-week-number");
  let currentMonth = new Date().getMonth() + 1;
  let currentDate = new Date().getDate();
  let currentYear = new Date().getFullYear();
  // let concatMDY = `${"0" + currentMonth.slice(-2)}/
  // ${"0" + currentDate.slice(-2)}/
  // ${currentYear}
  // `;
  let concatMDY = `${currentMonth}/${currentDate}/${currentYear}`;
  let currentWeekNumber = weekNumber(concatMDY);
  return currentWeekNumber;
}

/*
export function whichWeek(datestring) {
  let currentDate = new Date(datestring);
  console.log(currentDate);
  let startDate = new Date(currentDate.getFullYear(), 0, 1);
  let days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));
  let weekNumber = Math.ceil((currentDate.getDay() + 1 + days) / 7);

  return weekNumber;
}

export function currentWeek() {
  let currentDate = new Date();
  let startDate = new Date(currentDate.getFullYear(), 0, 1);
  let days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));
  let weekNumber = Math.ceil((currentDate.getDay() + 1 + days) / 7);

  return weekNumber;
}
*/

/*
export function whichWeek(datestring) {
  var date1 = new Date(datestring);
  var oneJan = new Date(date1.getFullYear(), 0, 1);
  var numberOfDays = Math.floor((date1 - oneJan) / (24 * 60 * 60 * 1000));
  var result = Math.round((date1.getDay() + 1 + numberOfDays) / 7);
  // console.log(oneJan);
  // console.log(numberOfDays);
  // console.log(result);
  return result;
}

// console.log(whichWeek("2022-02-07"));

export function currentWeek() {
  var date1 = new Date();
  var oneJan = new Date(date1.getFullYear(), 0, 1);
  var numberOfDays = Math.floor((date1 - oneJan) / (24 * 60 * 60 * 1000));
  var result = Math.round((date1.getDay() + 1 + numberOfDays) / 7);
  // console.log(oneJan);
  // console.log(numberOfDays);
  // console.log(result);
  return result;
}
*/
