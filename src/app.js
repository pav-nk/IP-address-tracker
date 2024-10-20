import ymaps from 'ymaps';
import {validateIp} from './helpers';

const ipInput = document.querySelector('.search-bar__input');
const btn = document.querySelector('button');

const ipInfo = document.getElementById('ip');
const locationInfo = document.getElementById('location');
const timezoneInfo = document.getElementById('timezone');
const ispInfo = document.getElementById('isp');
const mapArea = document.getElementById('map');

const API_KEY = 'https://geo.ipify.org/api/v2/country,city?apiKey=at_KzMEONg50rlnuBwgJWZQkxLf8GbO1&ipAddress=';

let newMap = null;

btn.addEventListener('click', getData);
ipInput.addEventListener('keydown', handleKey);

function setInfo(data) {
    ipInput.value = '';
    const {ip, location, isp} = data;
    const {country, region, timezone, lat, lng} = location;
    console.log(newMap);
    ipInfo.innerHTML = ip;
    locationInfo.innerText = `${country} ${region}`;
    timezoneInfo.innerText = ` ${timezone}`;
    ispInfo.innerText = isp;

    newMap.setCenter([lat, lng]);
}

function getData() {
    if (validateIp(ipInput.value)) {
        fetch(`${API_KEY}${ipInput.value}`).then(response => response.json()).then(data => setInfo(data));
    }
}

function handleKey(evt) {
    if (evt.key === 'Enter') {
        getData();
    }
}

ymaps
    .load('https://api-maps.yandex.ru/2.1/?apikey=c563d004-13c2-424e-9dbb-84a8050241a3&lang=ru_RU')
    .then(maps => {
        newMap = new maps.Map(mapArea, {
        center: [-8.369326, 115.166023],
        zoom: 10
    });
}).catch(error => console.log('Failed to load Yandex Maps', error));



