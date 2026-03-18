let date = document.getElementById("date");

const ApiKey = "0678701d5fc8738f39cec1dde85c6ad5";

let container = document.querySelector(".card-Container");

const macedoniaCities = [
    "skopje",
    "bitola", 
    "kumanovo",
    "prilep",
    "tetovo",
    "veles",
    "štip",
    "ohrid",
    "gostivar",
    "strumica",
    "kavadarci",
    "kočani",
    "kičevo",
    "struga",
    "radoviš",
    "gevgjelija",
    "debar",
    "kriva palanka",
    "sveti nikole",
    "negotino",
    "delčevo",
    "vinica",
    "probištip",
    "aračinovo",
    "berovo"
];

const today = new Date();
const day = String(today.getDate()).padStart(2,'0');
const month = String(today.getMonth() + 1).padStart(2, '0');
const year = today.getFullYear();
const formated = `${day}/${month}/${year}`;
date.textContent = formated;

let clock = document.getElementById("clock");

function clockWork(){
    const now = new Date();
    const hour = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    clock.textContent = `${hour}:${minutes}:${seconds}`;
}

async function Data(cityValue) {
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${ApiKey}`);

        if(!response.ok){
            throw new Error("Could not fetch Data");
        }else{
            const data = await response.json();
            return data;
        }
    }catch(error){
        console.log(error);
    }
}

async function allCities(macedoniaCities){
    for(let city of macedoniaCities){
        let cityData = await Data(city);
        
        if(cityData){
            createCard(cityData);
        }
    }
}

function createCard(cityData){
    let newCard = document.createElement("div");
    newCard.className = "card";
    const now = new Date();
    const hour = now.getHours();
    if(hour>5 && hour<19){
        newCard.style.color = "black";
    }else{
        newCard.style.color = "white";
    }
    let id = cityData.weather[0].id;
    
    let bckcolor = getBackgroundColor(id);
    newCard.style.background = bckcolor;
    
    let cityName = cityData.name;
    cityName = cityName.toUpperCase();
    let temp = Math.round(cityData.main.temp - 273.15);
    let hum = cityData.main.humidity;
    let desc = getMacedonianDescription(id);
    desc = desc.charAt(0).toUpperCase() + desc.slice(1);
    let emoji = getWeatherEmoji(id);

    newCard.innerHTML = `
            <p class="city">${cityName}</p>
            <p class="temp">${temp}°C</p>
            <p class="humidity">Влажност = ${hum}%</p>
            <p class="desc">${desc}</p>
            <p class="emoji">${emoji}</p>
    `;

    container.appendChild(newCard);
}

function getWeatherEmoji(WeatherId){
    const now = new Date();
    const hour = now.getHours();
    
    if(hour>5 && hour<19){
        if(WeatherId>=200 && WeatherId<300){
            return "⛈️";
        }else if(WeatherId>=300 && WeatherId<322){
            return "🌧️";
        }else if(WeatherId>=500 && WeatherId<600){
            return "🌧️";
        }else if(WeatherId>=600 && WeatherId<700){
            return "❄️";
        }else if(WeatherId>=700 && WeatherId<800){
            return "☁️";
        }else if(WeatherId === 800){
            return "☀️";
        }else if(WeatherId>800){
            return "🌥️";
        }
    }else{
        if(WeatherId>=200 && WeatherId<300){
            return "⛈️";
        }else if(WeatherId>=300 && WeatherId<322){
            return "🌧️";
        }else if(WeatherId>=500 && WeatherId<600){
            return "🌧️";
        }else if(WeatherId>=600 && WeatherId<700){
            return "❄️";
        }else if(WeatherId>=700 && WeatherId<800){
            return "☁️";
        }else if(WeatherId === 800){
            return "🌙";
        }else if(WeatherId>800){
            return "☁️";
        }
    }
}

function getBackgroundColor(WeatherId){
    const now = new Date();
    const hour = now.getHours();
    
    if(hour>5 && hour<19){
        if(WeatherId>=200 && WeatherId<300){
            return "linear-gradient(180deg, hsl(220, 60%, 25%), hsl(45, 100%, 50%))";
        }else if(WeatherId>=300 && WeatherId<322){
            return "linear-gradient(180deg, hsl(200, 80%, 40%), hsl(210, 60%, 70%))";
        }else if(WeatherId>=500 && WeatherId<600){
            return "linear-gradient(180deg, hsl(200, 80%, 40%), hsl(210, 60%, 70%))";
        }else if(WeatherId>=600 && WeatherId<700){
            return "linear-gradient(180deg, hsl(200, 50%, 85%), hsl(180, 80%, 95%))";
        }else if(WeatherId>=700 && WeatherId<800){
            return "linear-gradient(180deg, hsl(200, 50%, 85%), hsl(180, 80%, 95%))";
        }else if(WeatherId === 800){
            return "linear-gradient(180deg, hsl(193, 83%, 65%), hsl(42, 95%, 65%))";
        }else if(WeatherId>800){
            return "linear-gradient(180deg, hsl(193, 83%, 65%), hsl(42, 95%, 65%))";
        }
    }else{
        if(WeatherId>=200 && WeatherId<300){
            return "linear-gradient(180deg, hsl(240, 70%, 10%), hsl(260, 60%, 20%))";
        }else if(WeatherId>=300 && WeatherId<322){
            return "linear-gradient(180deg, hsl(240, 50%, 15%), hsl(220, 40%, 30%))";
        }else if(WeatherId>=500 && WeatherId<600){
            return "linear-gradient(180deg, hsl(240, 60%, 12%), hsl(220, 50%, 25%))";
        }else if(WeatherId>=600 && WeatherId<700){
            return "linear-gradient(180deg, hsl(240, 40%, 20%), hsl(220, 30%, 40%))";
        }else if(WeatherId>=700 && WeatherId<800){
            return "linear-gradient(180deg, hsl(240, 30%, 15%), hsl(250, 25%, 30%))";
        }else if(WeatherId === 800){
            return "linear-gradient(180deg, hsl(240, 80%, 8%), hsl(270, 60%, 20%))";
        }else if(WeatherId>800){
            return "linear-gradient(180deg, hsl(240, 50%, 12%), hsl(250, 40%, 25%))";
        }
    }
}

function getMacedonianDescription(weatherId) {
    const descriptions = {
        200: 'грмотевици со слаб дожд',
        201: 'грмотевици со дожд',
        202: 'грмотевици со силен дожд',
        210: 'слаби грмотевици',
        211: 'грмотевици',
        212: 'силни грмотевици',
        
        300: 'слаб дожд',
        301: 'дожд',
        302: 'силен дожд',
        
        500: 'слаб дожд',
        501: 'умерен дожд',
        502: 'силен дожд',
        503: 'многу силен дожд',
        
        600: 'слаб снег',
        601: 'снег',
        602: 'силен снег',
        
        701: 'магла',
        711: 'дим',
        721: 'измагла',
        731: 'прав',
        741: 'магла',
        751: 'песок',
        
        800: 'чисто небо',
        
        801: 'малку облаци',
        802: 'расфрлани облаци',
        803: 'облачно',
        804: 'облачно'
    };
    
    return descriptions[weatherId] || 'непознато';
}

document.addEventListener('DOMContentLoaded', function() {
    allCities(macedoniaCities);
});


let inputCity = document.getElementById("inputCity");
let searchBtn = document.getElementById("searchBtn");


async function searchCity(){
    let city = inputCity.value;
    city = city.toLowerCase();
    let cityData = await Data(city);
    if(city == ''){
        container.innerHTML = '';
        allCities(macedoniaCities);
    }else if(cityData){
        container.innerHTML = '';
        createCard(cityData);
    }else{
        let error = document.createElement("p");
        error.textContent = 'ГРАДОТ НЕ ПОСТОИ!';
        error.classList = "errormsg";
        container.innerHTML = '';
        container.appendChild(error);
    }
   
}

clockWork();
setInterval(clockWork, 1000);
