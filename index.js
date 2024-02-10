let svgElement = document.querySelector("svg");

svgElement.querySelectorAll("path").forEach(region => {
    region.addEventListener('click', (e) => { // Added 'click' event type
        svgElement.querySelectorAll("path").forEach(element => {
            element.classList.remove('active');
        });
        region.classList.add('active');
        
        let title = region.getAttribute("title");
        let lon = region.getAttribute("lon");
        let lat = region.getAttribute("lat");
        
        if (lon !== null && lat !== null && title !== null) {
            getWeather(lat, lon, title).then(weather => {
                let min = (weather.main.temp_min - 273).toFixed(2); // Added .toFixed(2) to round to 2 decimal places
                let max = (weather.main.temp_max - 273).toFixed(2);
                document.querySelector("p").innerHTML = `${title}da ob havo harorati ${max}&deg;C`;
            }).catch(error => {
                console.error("Error fetching weather:", error);
            });
        }
    });
});

function getWeather(lat, lon, region) { // Added lat and lon as parameters
    return new Promise((resolve, reject) => {
        let response = fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=e1ba678bc0d710e32d87d46cc13dfa63`);
        response.then(function(data) {
            data.json().then(function(weather) {
                if (weather.cod == 400) {
                    reject("Not found");
                }
                resolve(weather);
            }).catch(error => {
                reject(error);
            });
        }).catch(error => {
            reject(error);
        });
    });
}
