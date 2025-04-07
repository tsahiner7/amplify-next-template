'use client';
import { useEffect, useState } from "react";
import ContentLoader from "react-content-loader";

export default function LocationFinderServer() {

    const [locationInfo, setLocationInfo] = useState({City: "Loading...", Longitude: 'N/A', Latitude: 'N/A'});

    const [weatherInfo, setWeatherInfo] = useState<any>(null);

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


    const MyLoader = () => (
        <ContentLoader 
          speed={2}
          width={400}
          height={160}
          viewBox="0 0 400 160"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="48" y="8" rx="3" ry="3" width="88" height="6" /> 
          <rect x="48" y="26" rx="3" ry="3" width="52" height="6" /> 
          <rect x="0" y="56" rx="3" ry="3" width="410" height="6" /> 
          <rect x="0" y="72" rx="3" ry="3" width="380" height="6" /> 
          <rect x="0" y="88" rx="3" ry="3" width="178" height="6" /> 
          <circle cx="20" cy="20" r="20" />
        </ContentLoader>
      )

    const isLoading = locationInfo.City === "Loading..." || !weatherInfo;

    return (
        <>
            {
                isLoading 
                ? (
                    <MyLoader />
                ) 
                : (
                    <>
                        <h1>Hello from {locationInfo.City} - Client Component</h1>
                        <p>
                            It is currently {weatherInfo.dataseries[0].temp2m} degrees celsius
                        </p>
                    </>
                )
            }
        </>
    )
}