'use client';
import { useEffect, useState } from "react";

export default function LocationFinderServer() {

    const [locationInfo, setLocationInfo] = useState({City: 'N/A', Longitude: 'N/A', Latitude: 'N/A'});

    const [weatherInfo, setWeatherInfo] = useState({dataseries: []});

    const getLocationInfo = async () => {
        const response = await fetch('https://apip.cc/json');
        const locationData = await response.json();
        // console.log(locationData);
        setLocationInfo(locationData);
    }

    const getWeatherInfo = async (lon:any, lat:any) => {
        const response = await fetch(`https://www.7timer.info/bin/astro.php?lon=${lon}&lat=${lat}&ac=0&unit=metric&output=json&tzshift=0`);
        const weatherData = await response.json();
        // console.log(weatherData);
        setWeatherInfo(weatherData);
    }


    useEffect(() => {
        getLocationInfo();
    }, []);

    useEffect(() => {
        const { Longitude, Latitude } = locationInfo;
        if (Longitude !== 'N/A' && Latitude !== 'N/A') {
            getWeatherInfo(Longitude, Latitude);
        }
    }, [locationInfo]);


    return (
        <>
        <h1>Hello from {locationInfo.City} - Client Component</h1>
        <p>
            {
                weatherInfo.dataseries.length > 0
                ? `It is currently ${weatherInfo.dataseries[0].temp2m} degrees celsius`
                : 'Loading weather...'
            }
        </p>
        </>
    )
}