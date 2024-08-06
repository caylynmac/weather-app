"use client";
import { useState } from "react";
import { useEffect } from "react";

export default function CurrentWeatherStack({data})
{

    
    return(
        <div>
            {(data !=null)? (
            <div>
                <div className="flex items-center">
                    <p>CURRENT</p>
                    <img className="w-8"src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}></img>
                </div>
                <div className="flex gap-2 bg-neutral-700 p-3 rounded-xl">
                    <div className="flex-col">
                        <p>{data.temp}°</p>
                        <p>{data.clouds}%</p>
                    </div>
                    <div className="flex-col">
                        <p>AQI </p>
                        <p>{data.wind_speed}km/h</p>
                    </div>
                </div>
            </div>
            ):(
                <div><p>No data found</p></div>
            )
            }
        </div>
    );
}