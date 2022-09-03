import axios from "axios";
import React, { useEffect, useState } from "react";
import LoadingScreen from "./LoadingScreen";


const Weather = () => {

    const [weather, setWeather] = useState({});
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
        
        navigator.geolocation.getCurrentPosition(success);
        
        function success(pos) {
        const crd = pos.coords;
      
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=c2eb056c8be15a519201fade22b14a9c`)
        .then((res) => {setWeather(res.data)
        setIsLoading(false)});
        };
        
    }, []);

    console.log(weather);

    const [isCelsius, setIsCelsius] = useState(true)

    const changeFarenheit =()=>{
    setIsCelsius(!isCelsius)
   }

   const backgroundImage = [`https://media.giphy.com/media/GFXNdR1tuMopi/giphy.gif`, `https://media.giphy.com/media/n0Zt16UrMKNFu/giphy.gif`, `https://media.giphy.com/media/13ZEwDgIZtK1y/giphy.gif`, `https://media.giphy.com/media/3ohs4uJC1G9NNq03fi/giphy.gif`, `https://media.giphy.com/media/Xi2Xu0MejhsUo/giphy.gif`, `https://media.giphy.com/media/l3q2KUEEnYm7up0Gs/giphy.gif` ];
   
   if(`${weather.weather?.[0].main}` === 'Clouds'){
    document.body.style = `background-image: url(${backgroundImage[0]})`
   }else if(`${weather.weather?.[0].main}` === 'Rain' || `${weather.weather?.[0].main}` === 'Drizzle' ){
    document.body.style = `background-image: url(${backgroundImage[1]})`
   }else if(`${weather.weather?.[0].main}` === 'Thunderstorm'){
    document.body.style = `background-image: url(${backgroundImage[2]})`
   }else if(`${weather.weather?.[0].main}` === 'Clear'){
    document.body.style = `background-image: url(${backgroundImage[3]})`
   }else if(`${weather.weather?.[0].main}` === 'Snow'){
    document.body.style = `background-image: url(${backgroundImage[4]})`
   }else if(`${weather.weather?.[0].icon}` === '50d'){
    document.body.style = `background-image: url(${backgroundImage[5]})`
   }


   
    return ( isLoading ? (<LoadingScreen/>) 
        : (<div className="weather-container">
        <div className="weather-header">
            <h2>{weather.name}, <b>{weather.sys?.country}</b></h2>
            <div className="temperature">
                <p>{isCelsius ? `${parseFloat(`${weather.main?.temp-273.15}`).toFixed(2)} °C` : `${parseFloat(`${weather.main?.temp-273.15}`*1.8+32).toFixed(2)} °F`}</p>
                <button className="change-degrees" onClick={changeFarenheit}>
                    <i class="fa-solid fa-repeat"></i>
                </button>
            </div>


            <p className="description">{weather.weather?.[0].description}</p>

            <img src={`https://openweathermap.org/img/wn/${weather.weather?.[0].icon}.png`} alt="" />
        </div>
        
        <div className="weather-info">
            <div className="wind-speed">
                <i className="fa-solid fa-wind"></i>
                <p>Wind speed:</p><p>{weather.wind?.speed} m/s</p>
            </div>
            <div className="clouds">
                <i className="fa-solid fa-cloud"></i>
                <p>Clouds:</p><p>{weather.clouds?.all}%</p>
            </div>
            <div className="pressure">
                <i class="fa-solid fa-temperature-three-quarters"></i>
                <p>Pressure:</p><p>{weather.main?.pressure} hPa</p>
            </div>
        </div>
    
        
    </div>)
        
    );
};

export default Weather;