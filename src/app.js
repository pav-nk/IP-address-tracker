import { validateIp } from "./helpers";

const ipInput = document.querySelector(".search-bar__input");
const btn = document.querySelector("button");

const ipInfo = document.getElementById("ip");
const locationInfo = document.getElementById("location");
const timezoneInfo = document.getElementById("timezone");
const ispInfo = document.getElementById("isp");
const mapArea = document.getElementById("map");

const API_KEY =
	"https://geo.ipify.org/api/v2/country,city?apiKey=at_KzMEONg50rlnuBwgJWZQkxLf8GbO1&ipAddress=";

let newMap = null;

const [defaultLat, defaultLng] = [55.755864, 37.617698];

btn.addEventListener("click", getData);
ipInput.addEventListener("keydown", handleKey);

function setMarker(lat, lng) {
	const myIconContentLayout = ymaps.templateLayoutFactory.createClass(
		'<span class="marker"></span>'
	);
	const placemark = new ymaps.Placemark(
		[lat, lng],
		{
			hintContent: "Marker",
		},
		{
			iconLayout: myIconContentLayout,
		}
	);
	console.log(placemark);
	newMap.geoObjects.add(placemark);
}

function setInfo(data) {
	ipInput.value = "";
	const { ip, location, isp } = data;
	const { country, region, timezone, lat, lng } = location;
	console.log(newMap);
	ipInfo.innerHTML = ip;
	locationInfo.innerText = `${country} ${region}`;
	timezoneInfo.innerText = ` ${timezone}`;
	ispInfo.innerText = isp;

	newMap.setCenter([lat, lng]);

	setMarker(lat, lng);
}

function getData() {
	if (validateIp(ipInput.value)) {
		fetch(`${API_KEY}${ipInput.value}`)
			.then((response) => response.json())
			.then((data) => setInfo(data));
	}
}

function handleKey(evt) {
	if (evt.key === "Enter") {
		getData();
	}
}

ymaps
	.ready((maps) => {
		newMap = new maps.Map(mapArea, {
			center: [defaultLat, defaultLng],
			zoom: 10,
			controls: [],
		});
		setMarker(defaultLat, defaultLng);
	})
	.catch((error) => console.log("Failed to load Yandex Maps", error));
