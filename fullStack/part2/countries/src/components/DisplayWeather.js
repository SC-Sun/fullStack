import { useEffect, useState } from "react";
import axios from "axios";

const apiKey = process.env.REACT_APP_API_KEY;

const DisplayWeather = ({ country }) => {
  const [weather, setWeather] = useState([]);
  const name = country.name.common;

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${name}&APPID=${apiKey}`
      )
      .then((response) => {
        console.log("promose/weather fullffilled");
        setWeather(response.data);
        console.log(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const findWeather = Object.values(weather);
  const icon = weather?.weather?.[0].icon;
  const speed = weather?.wind?.speed;
 

  return (
    <>
      <div>
        <h3>Weather in {`${country.capital}`}</h3>
        <p>
          temperature {Math.ceil(Array.from(findWeather)[3]?.temp - 273.15)}{" "}
          Celcius
        </p>
        <img
          src={`https://openweathermap.org/img/wn/${
            icon ? icon : "01d"
          }@2x.png`}
          alt="Weather icon"
        />
        <p>wind {speed} m/s</p>
      </div>
    </>
  );
};

export default DisplayWeather;
 
 