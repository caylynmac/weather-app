"use client";
import { useState } from "react";
import { useEffect } from "react";
import CurrentWeatherStack from "./currentWeatherStack";
import DailyWeatherStack from "./dailyWeatherStack";
import SimpleDateTime  from 'react-simple-timestamp-to-date';
import { WiSunrise } from "react-icons/wi";
import { WiSunset } from "react-icons/wi";
//put api key in env variables next time

//fetch weather data
async function fetchWeather() {
    const response = await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=51.048615&lon=-114.070847&exclude=hourly,minutely&units=metric&appid=32a7d74bee3c8f2d32b9b1b3b398abb0`
    );
    const data = await response.json();
    
    return data;
  }

export default function Weather(){

    // const [lat, setLat] = useState(null);
    // const [long, setLong] = useState(null);

    const [currentWeather, setCurrentWeather] = useState(null);
    const [dailyWeather, setDailyWeather] = useState([]);

    async function loadWeather() {
      try {
        const data = await fetchWeather();
        
        //current weather (obj)
        let currentWeatherData = data.current;
        setCurrentWeather(currentWeatherData);

        //daily weather array
        let daily = data.daily;
        let dailyWeatherArray = daily.splice(0,5).map((day)=> ({...day}));
        setDailyWeather(dailyWeatherArray);
      
      } catch (error) {
        console.error(error);
      }
    }
  
    useEffect(() => {
      // const fetchData = async () => {
      //   navigator.geolocation.getCurrentPosition(function(position) {
      //     setLat(position.coords.latitude);
      //     setLong(position.coords.longitude);
      //   });      
      loadWeather();
    }, [])

    //let temp = currentWeather.temp;
    
    return(
      <div>
        {(currentWeather !=null)? (
        <div className="p-4 flex gap-6 items-center">
          <h2>Calgary, AB</h2>
          <WiSunrise/>
          <SimpleDateTime timeSeparator=":" showDate="0">{currentWeather.sunrise}</SimpleDateTime>
          <WiSunset/>
          <SimpleDateTime timeSeparator=":" showDate="0">{currentWeather.sunset}</SimpleDateTime>
        </div>
        ):(<div></div>)}
        <div className="bg-neutral-800 flex gap-4 p-4 rounded-xl">
          <CurrentWeatherStack data={currentWeather}></CurrentWeatherStack>
          <ul className="flex gap-4">
            {dailyWeather.map((day) => (
              <li key={day}>
                <DailyWeatherStack data={day}/>
                </li>
            ))}
            </ul>
        </div>
      </div>
    );
}