export default async function LocationFinderServer() {

    const response = await fetch('https://apip.cc/json');
    const locationData = await response.json();
    console.log(locationData);
    const locationInfo = locationData;
    
    const lon = locationInfo.Longitude;
    const lat = locationInfo.Latitude;

    //Get current weather info from location according to lon and lat
    const responseWeather = await fetch(`https://www.7timer.info/bin/astro.php?lon=${lon}&lat=${lat}&ac=0&unit=metric&output=json&tzshift=0`);
    const weatherData = await responseWeather.json();
    console.log(weatherData.dataseries[0].temp2m);
    const weatherInfo = weatherData;


    return (
        <>
        <h1>Hello from {locationInfo?.City} - Server Component</h1>
        <p>It is currently {weatherInfo?.dataseries[0].temp2m} degrees celsius</p>
        </>
    )
}