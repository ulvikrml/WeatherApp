const tempDegree = document.querySelector('.temp');
const cityName = document.querySelector('.city-name');
const cityTime = document.querySelector('.city-time');
const cityDay = document.querySelector('.city-day');
const condition = document.querySelector('.condition');
const cloudy = document.querySelector('.cloudy');
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');
const icon = document.querySelector('.icon');
const city = document.querySelectorAll('.city');
const cities = document.querySelector('.cities');
const apiKey = 'ac69ba83e3794eb2ba3135150221207';
const errBox = document.querySelector('.error-box');
const submitBtn = document.querySelector('.submit');
const searchInput = document.querySelector('.search');
const form = document.querySelector('form');

let cityArr = ['New York', 'California City', 'Paris', 'Tokyo'];

const addCities = () => {
    cities.innerHTML = ' ';
    cityArr.forEach(element => {
        let p = document.createElement('p');
        p.classList.add('city');
        p.innerHTML = element;
        document.getElementById('cities').appendChild(p);
    });
}
window.addEventListener('load', addCities());

const chooseCity = () => {
    const city = document.querySelectorAll('.city');
    city.forEach(element => {
        element.addEventListener('click', (e) => {
            let cityInput = e.target.innerHTML;
            getWeatherData(cityInput);
        });
    });
}
cities.addEventListener('load', chooseCity());

const getWeatherData = (city) => {
    fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            const dataName = data.location.name;

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
            cityName.innerHTML = dataName;

            const iconSrc = data.current.condition.icon.substr(35);
            icon.src = `./assets/64x64/${iconSrc}`;

            cloudy.innerHTML = data.current.cloud + '%';
            humidity.innerHTML = data.current.humidity + '%';
            wind.innerHTML = data.current.wind_kph + 'km/h';

            const even = (element) => element == dataName;
            const isActive = cityArr.some(even);

            const addCitytoArray = () => {
                cityArr.pop();
                cityArr.unshift(dataName);
            }

            isActive ? '' : addCitytoArray();

            addCities();
            chooseCity()
        })
        .catch(err => {
            errBox.classList.add('show');
            errBox.classList.add('showAlert');
            errBox.classList.remove('hide');
            searchInput.disabled = true;
            setTimeout(() => {
                errBox.classList.add('hide');
                errBox.classList.remove('show');
                errBox.classList.remove('showAlert');
                searchInput.disabled = false;
            }, 2000)


        });
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let cityName = searchInput.value;
    getWeatherData(cityName);
    searchInput.value = '';
})

