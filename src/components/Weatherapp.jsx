import { useState } from 'react';

function Weatherapp() {
  const [city, setCity] = useState('');
  const [temperature, setTemperature] = useState('');
  const [imglink, setImglink] = useState('https://cdn-icons-png.freepik.com/256/17112/17112207.png?semt=ais_hybrid');
  const [realcity, setRealcity] = useState('');
  const [windspeed, setWindspeed] = useState('');
  const [humidity, setHumidity] = useState('');
  const [statename, setStatename] = useState('');

  const checkweather = async (cityname) => {
    if (!city.trim()) return;

    try {
      const response = await fetch(`https://weather-backend-cyan.vercel.app/weather?city=${encodeURIComponent(cityname)}`);
      const data = await response.json();
      const temp = data.current.temp_c;
      const iconlink = data.current.condition.icon;
      const thecityname = data.location.name;
      const checkhumidity = data.current.humidity;
      const checkspeed = data.current.wind_kph;
      const checkstate = data.location.region;

      setImglink(iconlink);
      setTemperature(`${temp}°C`);
      setRealcity(thecityname);
      setWindspeed(checkspeed);
      setHumidity(checkhumidity);
      setStatename(checkstate);
    } catch (err) {
      console.log('There is some error while fetching the weather data', err);
      setTemperature('Could not fetch weather');
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{ backgroundImage: "url('/backgroundmain.jpg')" }}
    >
      <div className="bg-white/20 backdrop-blur-md rounded-xl p-6 md:p-8 shadow-xl h-auto md:h-[500px] max-w-lg w-full text-white">
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-6">Weather App</h1>

        <div className="flex flex-col md:flex-row items-center gap-4">
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                checkweather(city);
              }
            }}
            className="w-full px-4 py-2 rounded-full text-black focus:outline-none bg-white"
          />
          <button
            onClick={() => checkweather(city)}
            className="aspect-square w-12 rounded-full bg-white flex items-center justify-center p-0 border"
          >
            <img src="/searchicon.png" alt="Search Icon" className="w-6 h-6" />
          </button>
        </div>

        <div className="flex justify-center mt-6">
          <img src={imglink} className="w-28 h-28 md:w-36 md:h-36" />
        </div>

        <div className="mt-4 text-center text-lg md:text-xl">
          <div className="text-2xl md:text-3xl font-sans font-bold">{temperature}</div>
          <div className="font-bold">{realcity}, {statename}</div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row justify-between text-lg md:text-xl font-sans font-bold">
          <div className="mb-2 sm:mb-0">Wind Speed: {windspeed}</div>
          <div>Humidity: {humidity}</div>
        </div>
      </div>
    </div>
  );
}

export default Weatherapp;
