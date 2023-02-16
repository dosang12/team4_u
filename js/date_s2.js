const tommorow = document.querySelector(".tommorow");
const dayTommorow = document.querySelector(".day_tommorow");
const threeDaysNow = document.querySelector(".three_days_now");
const fourDaysNow = document.querySelector(".four_days_now");
const toMon = document.querySelector(".mon-txt");
const todTxt = document.querySelector(".to-txt");

let day1 = new Date();
let toDayTxt = day1.getDate();
let monText = day1.getMonth() + 1;
let day2, day3, day4, day5;
let week = [day2, day3, day4, day5];
toMon.innerText = `${String(monText).padStart(2, "0")}`;
todTxt.innerText = `${String(toDayTxt).padStart(2, "0")}`;

getDays();
function getDays() {
  week.forEach((el, idx) => {
    el = new Date(day1);
    el.setDate(day1.getDate() + idx + 1);
    let dayText = el.getDate();
    setDays(dayText, idx);
  });
}
function setDays(dayText, idx) {
  switch (idx) {
    case 0: {
      tommorow.innerText = `${dayText}`;
      break;
    }
    case 1: {
      dayTommorow.innerText = ` ${dayText}`;
      break;
    }
    case 2: {
      threeDaysNow.innerText = `${dayText}`;
      break;
    }
    case 3: {
      fourDaysNow.innerText = `${dayText}`;
      break;
    }
    default: {
      alert("sorry");
    }
  }
}
