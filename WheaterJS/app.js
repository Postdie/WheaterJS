const APIKEY = '65bf3940e6210f69f0027da184de1eeb';
const URLBASE = 'https://api.openweathermap.org/data/2.5/weather?';

async function request(url) {
    return fetch(url).then(result => result.json());
}

async function getClima(lat, lon) {
    const url = URLBASE + `lat=${lat}&lon=${lon}&appid=${APIKEY}`;
    const data = await request(url);
    console.log("Temperatura: ", data.main.temp);
    console.log("Ciudad: ", data.name);
    updateDOM(data.main.temp, data.name);
}

document.getElementById('miBoton').addEventListener('click', function () {
    navigator.geolocation.getCurrentPosition(positions => {
        const lat = positions.coords.latitude;
        const lon = positions.coords.longitude;
        getClima(lat, lon);
    });
});

async function updateDOM(temp, name) {
    const temperaturaElement = document.getElementById('temperatura');
    const ciudadElement = document.getElementById('ciudad');
    const body = document.body;
    const boton = document.getElementById('miBoton');
    const imagenContainer = document.getElementById('imagenContainer');

    temperaturaElement.textContent = `Temperatura: ${temp}°C`;
    ciudadElement.textContent = `Ciudad: ${name}`;

    body.classList.remove('frio', 'cool', 'calor');
    imagenContainer.innerHTML = '';

    if (temp <= 10) {
        console.log("Hace frío");
        body.classList.add('frio');
        imagenContainer.innerHTML = '<img src="./Frio.gif" alt="Hace frío">';
    } else if (temp >= 10 && temp <= 24) {
        console.log("El día está fresco");
        body.classList.add('cool');
        imagenContainer.innerHTML = '<img src="./BuenDia.gif" alt="Día fresco">';
    } else {
        console.log("Hace calor");
        body.classList.add('calor');
        imagenContainer.innerHTML = '<img src="./Calor.gif" alt="Hace calor">';
    }
}