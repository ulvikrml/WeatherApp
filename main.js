const tempDegree = document.querySelector('.temp');
const cityName = document.querySelector('.city-name');
const cityTime = document.querySelector('.city-time');
const cityDay = document.querySelector('.city-day');
const condition = document.querySelector('.condition');
const cloudy = document.querySelector('.cloudy');
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');
const apiKey = 'ac69ba83e3794eb2ba3135150221207';
const icon = document.querySelector('.icon');
const city = document.querySelectorAll('.city');
const cities = document.querySelector('.cities');

let cityArr = ['New York', 'California', 'Paris', 'Tokyo'];

const addCities = () =>{
    cities.innerHTML = ' ';
    cityArr.forEach(element =>{
        let html = `<p class="city">${element}</p>`;
        let p = document.createElement('p');
        p.classList.add('city');
        p.innerHTML = element;
        document.getElementById('cities').appendChild(p);
    });
}
window.addEventListener('load',addCities());

city.forEach(element => {
        element.addEventListener('click', (e) => {
            let cityInput = e.target.innerHTML;
            getWeatherData(cityInput);
        });
    });
const getWeatherData = (city) => {
    fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`)
        .then(res => res.json())
        .then(data => {
            console.log(data);

            tempDegree.innerHTML = data.current.temp_c + "&#176;";
            condition.innerHTML = data.current.condition.text;

            const currentDate = data.location.localtime
            let time = currentDate.substr(11);

            const date = new Date(currentDate);
            const year = date.getFullYear();
            const month = date.getMonth();
            const day = date.getDate();
            const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            const weekday = weekdays[date.getDay()];

            cityTime.innerHTML = time;
            cityDay.innerHTML = `-${weekday} ${day}, ${month}, ${year}`;
            cityName.innerHTML = data.location.name;

            const iconSrc = data.current.condition.icon.substr(35);
            icon.src = `./assets/64x64/${iconSrc}`;

            cloudy.innerHTML = data.current.cloud + '%';
            humidity.innerHTML = data.current.humidity + '%';
            wind.innerHTML = data.current.wind_kph + 'km/h';

            cityArr.shift();
            cityArr.push(data.location.name);
            addCities();
        });
}
// getData('London');  

const submitBtn = document.querySelector('.submit');
const searchInput = document.querySelector('.search');
const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let cityName = searchInput.value;
    getWeatherData(cityName);
    searchInput.value = '';
})

