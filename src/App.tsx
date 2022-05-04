import { useState, useEffect } from "react"
import "./styles/app.css"

type WeatherInformationType = {
  base: string
  clouds: {}
  cod: number
  coord: {}
  dt: number
  id: number
  main: {
    temp: number
    temp_max: number
    temp_min: number
  }
  name: string
  sys: {
    country: string
  }
  timezone: number
  visibility: number
  weather: [
    {
      icon: string
    }
  ]
  wind: {}
}

function App() {  
  const [ weatherInformations, setWeatherInformations ] = useState<WeatherInformationType>()

  function showPosition(position: any) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${import.meta.env.VITE_API_KEY}`)
    .then(response => response.json())
    .then(data => {
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
        <p>Temperature: { temp } ºC</p>
        <p>Max temperature: { tempMax } ºC</p>
        <p>Min temperature: { tempMin } ºC</p>
      </div>      
    </div>
  )
}

export default App