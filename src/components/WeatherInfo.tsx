import { useState } from "react";

const WeatherInfo = () => {
  const key: string = "67f17675817db58234ff83906fe13a80";

  interface Weather {
    temp: number,
    feels_like: number,
    temp_max: number,
    temp_min: number,
    description: string
  };

  const [weather, setWeather] = useState<Weather | null>(null);

  async function searchCity(city: string) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric&lang=pt_br`);
    const data = await response.json();

    if (data.cod === 200) {
      console.log(data);

      setWeather({
        temp: data.main.temp,
        feels_like: data.main.feels_like,
        temp_max: data.main.temp_max,
        temp_min: data.main.temp_min,
        description: data.weather[0].description,
      });

    } else {
      console.error('Erro na requisição:', data.message);
    }

    let temp = data.main.temp;
    return temp;
  }

  const [inputCity, setInputCity] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputCity(event.target.value);
  }

  const handleClick = () => {
    if (inputCity) {
      searchCity(inputCity);
    } else {
      console.error("Por favor, insira uma cidade.");
    }
  }

  return (
    <div>
      <div className='main-container'>

        <h1>Previsão do tempo</h1>

        
          <label htmlFor="city">Cidade: </label>
          <input
            type="text"
            name="city"
            id="city"
            value={inputCity}
            onChange={handleChange}
            className="city-input"
          />
          <button onClick={handleClick} className="search-btn">Pesquisar</button>


        {weather && (
          <div>
            <h3>Informações do Clima</h3>
            <p>Temperatura: {weather.temp}°C</p>
            <p>Sensação térmica: {weather.feels_like}°C</p>
            <p>Temperatura máxima: {weather.temp_max}°C</p>
            <p>Temperatura mínima: {weather.temp_min}°C</p>
            <p>Céu: {weather.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default WeatherInfo;
