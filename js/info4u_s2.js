const day1Icon = document.querySelector(".day1_img_box"),
  day1Temp = document.querySelector(".day1_temp"),
  day1Feel = document.querySelector(".day1_feel"),
  day1Max = document.querySelector(".day1_max"),
  day1Min = document.querySelector(".day1_min"),
  day2Icon = document.querySelector(".day2_img_box"),
  day2Temp = document.querySelector(".day2_temp"),
  day2Feel = document.querySelector(".day2_feel"),
  day3Icon = document.querySelector(".day3_img_box"),
  day3Temp = document.querySelector(".day3_temp"),
  day3Feel = document.querySelector(".day3_feel"),
  day4Icon = document.querySelector(".day4_img_box"),
  day4Temp = document.querySelector(".day4_temp"),
  day4Feel = document.querySelector(".day4_feel"),
  day5Icon = document.querySelector(".day5_img_box"),
  day5Temp = document.querySelector(".day5_temp"),
  day5Feel = document.querySelector(".day5_feel"),
  info4uItems = document.querySelector(".info4u_items");

const API_KEY = "13d65e61f137b42c9eab57a4295043cb";
function currentOn(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = [`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`, `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`];
  url.forEach((el, idx) => {
    curWeather(el, idx);
  });
}
function currentOff() {
  alert("위치를 찾을 수 없습니다.");
}

// data 받아오기
async function curWeather(url, idx) {
  let curRes = await fetch(url);
  let datas = await curRes.json();
  switch (idx) {
    case 0:
      getCurWeather(datas);
      break;
    case 1:
      getWeekWeather(datas);
      break;
    default:
      alert("연결에 실패했습니다.");
  }
}

// 현재 날씨 데이터 받아오기
function getCurWeather(datas) {
  let todayWeather = {
    dayTemp: datas.main.temp,
    dayFeel: datas.main.feels_like,
    dayMax: datas.main.temp_max,
    dayMin: datas.main.temp_min,
    dayId: datas.weather[0].icon,
  };
  let temp = todayWeather.dayTemp;
  let feelLike = todayWeather.dayFeel;
  let maxTemp = todayWeather.dayMax;
  let minTemp = todayWeather.dayMin;
  let idCode = todayWeather.dayId;
  setCurWeather(temp, maxTemp, minTemp, feelLike, idCode);
}

function setCurWeather(temp, maxTemp, minTemp, feelLike, idCode) {
  setIcon(idCode, 5);
  day1Temp.innerText = `현재온도 : ${temp}°C`;
  day1Max.innerText = `최대온도 : ${maxTemp}°C`;
  day1Min.innerText = `최저온도 : ${minTemp}°C`;
  setInfo4u(maxTemp, minTemp, feelLike);
}

function getWeekWeather(datas) {
  console.log(datas.list);
  let days = [datas.list[10], datas.list[18], datas.list[26], datas.list[34]];
  days.forEach((el, idx) => {
    console.log(el);
    let dayWeather = {
      dayTemp: el.main.temp,
      dayFeel: el.main.feels_like,
      dayId: el.weather[0].icon,
    };
    let weekTemp = dayWeather.dayTemp;
    let feelLike = dayWeather.dayFeel;
    let idCode = dayWeather.dayId;
    setWeek(weekTemp, feelLike, idCode, idx);
  });
}

function setWeek(weekTemp, feelLike, idCode, idx) {
  switch (idx) {
    case 0:
      setIcon(idCode, idx);
      day2Temp.innerText = `온도 : ${weekTemp}°C`;
      day2Feel.innerText = `체감온도 : ${feelLike}°C`;
      break;
    case 1:
      setIcon(idCode, idx);
      day3Temp.innerText = `온도 : ${weekTemp}°C`;
      day3Feel.innerText = `체감온도 : ${feelLike}°C`;
      break;
    case 2:
      setIcon(idCode, idx);
      day4Temp.innerText = `온도 : ${weekTemp}°C`;
      day4Feel.innerText = `체감온도 : ${feelLike}°C`;
      break;
    default:
      setIcon(idCode, idx);
      day5Temp.innerText = `온도 : ${weekTemp}°C`;
      day5Feel.innerText = `체감온도 : ${feelLike}°C`;
      break;
  }
}

function setIcon(idCode, idx) {
  let iconCase = idCode.substring(0, 2);
  switch (iconCase) {
    case "01":
      idCode = "01d";
      break;
    case "02":
      idCode = "02d";
      break;
    case "03":
      idCode = "03d";
      break;
    case "04":
      idCode = "03d";
      break;
    case "09":
      idCode = "10d";
      break;
    case "10":
      idCode = "10d";
      break;
    case "11":
      idCode = "11d";
      break;
    case "13":
      idCode = "13d";
      break;
    case "50":
      idCode = "50d";
      break;
    default:
      console.log("failed");
  }
  switch (idx) {
    case 0:
      day2Icon.innerHTML = `<img src="images/information4u/png/${idCode}.png"/>`;
      break;
    case 1:
      day3Icon.innerHTML = `<img src="images/information4u/png/${idCode}.png"/>`;
      break;
    case 2:
      day4Icon.innerHTML = `<img src="images/information4u/png/${idCode}.png"/>`;
      break;
    case 3:
      day5Icon.innerHTML = `<img src="images/information4u/png/${idCode}.png"/>`;
      break;
    default:
      day1Icon.innerHTML = `<img src="images/information4u/png/${idCode}.png"/>`;
      break;
  }
}
function setInfo4u(maxTemp, minTemp, feelLike) {
  let winter = ["images/information4u/png/cloth_240x320_2", "images/information4u/png/cloth_240x320"];
  if (feelLike < 8) {
    winter.forEach((el) => {
      const infoEl = document.createElement("div");
      infoEl.classList.add("swiper-slide", "info4_item");
      infoEl.innerHTML = `
        <img src="${el}.png"/>
        <div class="feedback_btn feedOn"></div>
        <div class="feedback_close "></div>
        <div class="feedback">
          <div class="d-flex flex-column  align-items-center mt-2">
            <div class="choose_text section_txt">이 코디는 어떠신가요?</div>
            <div class="choose_text section_txt feedGood">좋아요</div>
            <div class="choose_text section_txt feedBad">싫어요</div>
          </div>
        <div>
      `;

      info4uItems.appendChild(infoEl);
      winterStyle(maxTemp, minTemp);
      feedBack(infoEl);
    });
  }
}

function winterStyle(maxTemp, minTemp) {
  const weatherTxt = document.querySelector(".info_txt_box");
  weatherTxt.innerHTML = `
    <p class="text-center section_txt">오늘 최고기온은 <span style="color:red;font-weight:bold;">${maxTemp}</span>°C이고 <br />
    오늘 최저기온은 <span style="color:red;font-weight:bold;">${minTemp}</span>°C 입니다. <br />
    비교적 추운관계로 따뜻한 패션을 준비했습니다.
    </p>
  `;
}

function feedBack() {
  const feedBtn = document.querySelectorAll(".feedback_btn");
  const feedClose = document.querySelectorAll(".feedback_close");
  const feed = document.querySelectorAll(".feedback");
  const fGood = document.querySelector(".feedGood");
  const fBad = document.querySelector(".feedBad");

  feedBtn.forEach((el, idx) => {
    fShow(el, idx);
  });
  feedClose.forEach((el, idx) => {
    fHide(el, idx);
    fGood.addEventListener("click", function () {
      feed[idx].classList.remove("feedOn");
      feedClose[idx].classList.remove("feedOn");
      feedBtn[idx].classList.add("feedOn");
    });
    fBad.addEventListener("click", function () {
      feed[idx].classList.remove("feedOn");
      feedClose[idx].classList.remove("feedOn");
      feedBtn[idx].classList.add("feedOn");
    });
  });

  function fShow(el, idx) {
    el.addEventListener("click", function () {
      feed[idx].classList.add("feedOn");
      feedClose[idx].classList.add("feedOn");
      el.classList.remove("feedOn");
    });
  }
  function fHide(el, idx) {
    el.addEventListener("click", function () {
      feed[idx].classList.remove("feedOn");
      feedClose[idx].classList.remove("feedOn");
      feedBtn[idx].classList.add("feedOn");
    });
  }
}

navigator.geolocation.getCurrentPosition(currentOn, currentOff);
