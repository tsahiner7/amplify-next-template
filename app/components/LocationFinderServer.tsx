export default async function LocationFinderServer() {

    const response = await fetch('https://apip.cc/json');
    const locationData = await response.json();
    // console.log(locationData);
    
    let lon = locationData.Longitude;
    let lat = locationData.Latitude;

    //Get current weather info from location according to lon and lat
    const responseWeather = await fetch(`https://www.7timer.info/bin/astro.php?lon=${lon}&lat=${lat}&ac=0&unit=metric&output=json&tzshift=0`);
    const weatherData = await responseWeather.json();
    console.log(locationData);
    console.log(lat, lon);


    return (
        <>
        <h1>Hello from {locationData?.City} - Server Component</h1>
        <p>It is currently {weatherData?.dataseries[0].temp2m} degrees celsius</p>
        </>
    )
}