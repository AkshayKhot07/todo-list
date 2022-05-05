export function whichWeek(datestring) {
  let currentDate = new Date(datestring);
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
