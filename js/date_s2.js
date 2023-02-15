const tommorow = document.querySelector(".tommorow");
const dayTommorow = document.querySelector(".day_tommorow");
const threeDaysNow = document.querySelector(".three_days_now");
const fourDaysNow = document.querySelector(".four_days_now");

let day1 = new Date();
let day2, day3, day4, day5;
let week = [day2, day3, day4, day5];

getDays();
function getDays() {
  week.forEach((el, idx) => {
    el = new Date(day1);
    el.setDate(day1.getDate() + idx + 1);
    let monText = el.getMonth() + 1;
    let dayText = el.getDate();
    setDays(monText, dayText, idx);
  });
}
function setDays(monText, dayText, idx) {
  switch (idx) {
    case 0: {
      tommorow.innerText = `${monText}월 ${dayText}일`;
      break;
    }
    case 1: {
      dayTommorow.innerText = `${monText}월 ${dayText}일`;
      break;
    }
    case 2: {
      threeDaysNow.innerText = `${monText}월 ${dayText}일`;
      break;
    }
    case 3: {
      fourDaysNow.innerText = `${monText}월 ${dayText}일`;
      break;
    }
    default: {
      alert("sorry");
    }
  }
}
