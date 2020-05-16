const api = {
  key: "2f4e4420d29a199d43830e2d20fac6d2",
  url: "https://api.openweathermap.org/data/2.5/",
};

$(".current").hide();

$(".search-box").on("keypress", function (e) {
  if (e.keyCode == 13) {
    getResult(e.target.value);
    e.target.value = "";
  }
});

function getResult(city) {
  fetch(`${api.url}weather?q=${city}&units=metric&APPID=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResult);
}

function displayResult(weather) {
  let celsius = Math.round(weather.main.temp);

  $(".current").show();
  $(".city").text(weather.name + ", " + weather.sys.country);
  $(".temp").html(celsius + "<span>°c</span>");
  $(".weather").text(weather.weather[0].main);
  $(".min-max").text();

  let date = new Date();
  $(".date").text(getDate(date));
}

function getDate(d) {
  let months = ["January", "Februrary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
