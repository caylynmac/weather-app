"use client";
import { useState } from "react";
import { useEffect } from "react";
import SimpleDateTime  from 'react-simple-timestamp-to-date';

export default function DailyWeatherStack({data})
{
    return(
        <div>
            <div className="flex items-center">
                <SimpleDateTime dateFormat="MDY" dateSeparator="/" showTime="0">{data.dt}</SimpleDateTime>
                <img className="w-8"src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}></img>
            </div>
            {(data !=null)? (
                <div className="flex gap-2 bg-neutral-700 p-3 rounded-xl">
                    <div className="flex-col">
                        <p>{data.temp.max}°</p>
                        <p>{data.clouds}%</p>
                    </div>
                    <div className="flex-col">
                        <p>UVI {data.uvi} </p>
                        <p>{data.wind_speed}km/h</p>
                    </div>
                </div>
            ):(
                <div><p>No weather data found</p></div>
            )
            }
        </div>
    );
}