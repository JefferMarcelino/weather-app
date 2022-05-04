import { useState, useEffect } from "react"

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
  weather: []
  wind: {}
}

function App() {  
  const [ weatherInformations, setWeatherInformations ] = useState({} as WeatherInformationType)

  function showPosition(position: any) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${import.meta.env.VITE_API_KEY}`)
    .then(response => response.json())
    .then(data => {
      setWeatherInformations(data)
      console.log(weatherInformations)
    })
  }

  useEffect(() => {
    if (navigator.geolocation) {
      return navigator.geolocation.getCurrentPosition(showPosition)
    } 

    return
  }, [])

  return (
    <div className="App">
      <div id="weather">
        <p>Country: { weatherInformations.sys.country }</p>
        <p>Location: { weatherInformations.name }</p>

        <p>Temperature: { weatherInformations.main.temp }</p>
        <p>Max temperature: { weatherInformations.main.temp_max }</p>
        <p>Min temperature: { weatherInformations.main.temp_min }</p>
      </div>      
    </div>
  )
}

export default App