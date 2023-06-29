import axios from 'axios';
import { useState } from 'react';

function App() {
  //Key for getting data from API
  const key = "a86b8afdb3b29c7dbd65e0b11b8d03a6";
  const [data, setData] = useState({});
  const[location, setLocation] = useState("");
  //URL for reaching API
  //Location is using here come from User
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${key}&units=metric`
  //Get the data using this function
  const searchLocation = (event)=>{
    if(event.key === 'Enter') {
      //Used axios for getting data from API
      axios.get(url).then((response)=> {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }
  
  
  return (
    <div className="app">
      <div className='search'>
        <input
        value={location}
        //get the input for searching city.
        onChange={event=> setLocation(event.target.value)}
        //When press the enter button return the data
        onKeyPress={searchLocation}
        placeholder='Enter Location'
        type='text'/>
      </div>
      <div className='container'>
        <div className='top'>
          <div className='location'>
            <p>{data.name}</p>
          </div>
          <div className='temp'>
            {/*First reach the data.main after get the temp from here
             //toFixed() function round the temperature.*/}
            { data.main ? <h1>{data.main.temp.toFixed()} °C</h1> : null}

          </div>
          <div className='description'>
            {data.weather ? <p>{data.weather[0].main}</p> : null}

          </div>
        </div>
        <div className='bottom'>
          <div className='feels'>
            {data.main ? <p className='bold'>{data.main.feels_like.toFixed()} °C</p> : null}
            <p>Feels Like</p>
          </div>
          <div className="humidity">
            {data.main ? <p className='bold'>{data.main.humidity.toFixed()} %</p> : null}
            <p>Humidity</p>
          </div>
          <div className='wind'>
            {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
            <p>Wind Speed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
