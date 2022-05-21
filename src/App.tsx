import { useState, useEffect } from "react"
import "./styles/app.css"

type WeatherInformationType = {
  coord: {
    lat: number
    lon: number
  }
  main: {
    humidity: number
    pressure: number
    temp: number
    temp_max: number
    temp_min: number
  }
  name: string
  sys: {
    country: string
  }
  weather: [
    {
      main: string
      icon: string
    }
  ]
}

function App() {  
  const [ weatherInformations, setWeatherInformations ] = useState<WeatherInformationType>()

  function showPosition(position: any) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${import.meta.env.VITE_API_KEY}`)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      setWeatherInformations(data)
    })
  }
  
  useEffect(() => {
    if (navigator.geolocation) {
      return navigator.geolocation.getCurrentPosition(showPosition)
    } 
    return
  }, [])
  
  var temp = (Number(weatherInformations?.main.temp) - 273.15).toFixed(0)
  var tempMax = (Number(weatherInformations?.main.temp_max) - 273.15).toFixed(0)
  var tempMin = (Number(weatherInformations?.main.temp_min) - 273.15).toFixed(0)

  return (
    <div className="App">
      <div className="weather">
        <h1>{ weatherInformations?.name }</h1>
        <img src={`http://openweathermap.org/img/wn/${weatherInformations?.weather[0].icon}@2x.png`} alt="" />
        <p>{ temp } <sup>ºC</sup></p>
        <p>{ weatherInformations?.weather[0].main }</p>
        <div>
          <p>Max { tempMax } <sup>ºC</sup></p>
          <p>Min { tempMin } <sup>ºC</sup></p>
        </div>
      </div>
      <div className="more-info">
        <h2>More Info...</h2>
        <div className="coord">
          <p>Lat :{ weatherInformations?.coord.lat }</p>
          <p>Lon: { weatherInformations?.coord.lon }</p>
        </div>
        <p>Humidity: { weatherInformations?.main.humidity }</p>
        <p>Pressure: { weatherInformations?.main.pressure }</p>
      </div>
      <br />
      <p>@2022 Jeffer Marcelino</p>    
    </div>
  )
}

export default App