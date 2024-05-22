import { useState } from "react";
export default function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [WeeklyWeather, setWeeklyWeather] = useState(null);

  console.log(weather);
  async function getWeather() {
    try {
      setLoading(true);
      const apiResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=96d05373afde70d2db7a5cef61c73b75`
      ).then((response) => response.json());

      if (apiResponse.cod === "404") throw new Error(apiResponse.message);

      setWeather(apiResponse);
    } catch (err) {
      setWeather(null);
    } finally {
      setLoading(false);
      setCity("");
    }
  }
  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-10"> Weather </h1>
      <div>
        <div>
          <div className="flex gap-10 justify-center mb-10">
            <input
              className="border"
              type="text"
              placeholder="enter city..."
              onChange={(e) => setCity(e.target.value)}
              value={city}
              onKeyUp={(e) => {
                if (e.key === "Enter" && city) getWeather();
              }}
            />
            {!loading && (
              <button
                className="border-2 px-6 rounded-md"
                onClick={() => {
                  if (city) getWeather();
                }}
              >
                Search
              </button>
            )}
            {loading && (
              <button className="border-2 px-6 rounded-md">Loading...</button>
            )}
          </div>
          <div className="min-h-60">
            {weather && (
              <>
                <div className="relative  w-80 mx-auto">
                  <span className="text-xl font-semibold ">{weather.name}</span>
                  <span className="absolute -top-1 bg-yellow-500 px-4 rounded-md">
                    {weather.sys.country}
                  </span>
                </div>
                <div className="flex justify-between items-center w-80 mx-auto">
                  <div>
                    <span className="text-blue-600">Temperature: </span>
                    <span className="text-green-600">
                      {(Number(weather.main.temp) - 273.15).toFixed(1)}
                    </span>
                  </div>
                  <div>
                    <span className="text-blue-600">Humidity: </span>
                    <span className="text-green-600">
                      {weather.main.humidity}
                    </span>
                  </div>
                  <div>
                    <span className="text-blue-600">Pressure: </span>
                    <span className="text-green-600">
                      {weather.main.pressure}
                    </span>
                  </div>
                </div>
                <div className="w-80 mx-auto">
                  <img
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                    alt={weather.weather[0].description}
                  />
                  <p>{weather.weather[0].description}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div></div>
    </div>
  );
}
