import {validateIp} from './helpers';

const ipInput = document.querySelector('.search-bar__input');
const btn = document.querySelector('button');

const ipInfo = document.getElementById('ip');
const locationInfo = document.getElementById('location');
const timezoneInfo = document.getElementById('timezone');
const ispInfo = document.getElementById('isp');

const API_KEY = 'https://geo.ipify.org/api/v2/country?apiKey=at_KzMEONg50rlnuBwgJWZQkxLf8GbO1&ipAddress=';

btn.addEventListener('click', getData);
ipInput.addEventListener('keydown', handleKey);

function setInfo(data) {
    const {ip, location, isp} = data;
    const {country, region, timezone} = location;
    ipInfo.innerHTML = ip;
    locationInfo.innerText = `${country} ${region}`;
    timezoneInfo.innerText = ` ${timezone}`;
    ispInfo.innerText = isp;
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



