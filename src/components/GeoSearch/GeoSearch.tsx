import { FC, useCallback, useEffect, useState } from 'react'
import { City, Forecast, ForecastError, Option, Weather } from '../../types';
import fetchData from '../../helpers/fetch';
import { useDispatch } from 'react-redux';
import { setForecast, setForecastError, setWeather, setWeatherError } from '../../redux/forecastSlice';
import GeoList from './GeoList';


const GeoSearch: FC = () => {
  const dispatch = useDispatch();
  const [options, setOptions] = useState<Option[] | null>(null);
  const [value, setValue] = useState<Option>({ value: { lat: '', lon: '' }, label: '' });
  const [city, setCity] = useState<string>('');
  const [geo, setGeo] = useState<{ latitude: string; longitude: string }>({ latitude: '', longitude: '' });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setGeo({
          latitude: position.coords.latitude.toString(),
          longitude: position.coords.longitude.toString(),
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);



  const getCities = useCallback(async (city: string | undefined): Promise<Option[] | null> => {
    if (city) {
      const url = `${import.meta.env.VITE_API_URL}/geo/1.0/direct?q=${city?.split(' ')[0] || value.label.split(' ')[0]}&limit=10&appid=${import.meta.env.VITE_API_KEY}`;
      const data = await fetchData<City[]>(url);
      const citiesList = data?.map((city: City) => ({ value: { lat: city.lat.toString(), lon: city.lon.toString() }, label: city.name + (city.state ? ' ' + city.state : '') }));
      setOptions(citiesList);
      setCity(city);
      return citiesList;
    } else if (!city && geo.latitude && geo.longitude) {
      const url = `${import.meta.env.VITE_API_URL}/geo/1.0/reverse?lat=${geo.latitude}&lon=${geo.longitude}&limit=1&appid=${import.meta.env.VITE_API_KEY}`;
      const data = await fetchData<City[]>(url);
      const citiesList = data?.map((city: City) => ({ value: { lat: city.lat.toString(), lon: city.lon.toString() }, label: city.name + (city.state ? ' ' + city.state : '') }));
      setValue(citiesList[0]);
      setCity(citiesList[0].label);
      return citiesList;
    } else {
      return null;
    }
  }, [geo, value.label]);

  useEffect(() => {
    if (!value.label) {
      getCities(undefined);
    }
  }, [geo, value.label, getCities]);

  const getForecast = async () => {
    const url = `${import.meta.env.VITE_API_URL}/data/2.5/forecast?lat=${value.value.lat}&lon=${value.value.lon}&units=metric&appid=${import.meta.env.VITE_API_KEY}`;
    const data = await fetchData<Forecast | ForecastError>(url);
    if (data.cod === 200 || data.cod === '200') {
      dispatch(setForecast(data as Forecast));
    } else {
      dispatch(setForecastError(data as ForecastError))
      console.error('Error fetching forecast data:', data);
    }
  }

  const getWeather = async () => {
    const url = `${import.meta.env.VITE_API_URL}/data/2.5/weather?lat=${value.value.lat}&lon=${value.value.lon}&units=metric&appid=${import.meta.env.VITE_API_KEY}`;
    const data = await fetchData<Weather | ForecastError>(url);
    if (data.cod === 200 || data.cod === '200') {
      dispatch(setWeather(data as Weather));
    } else {
      dispatch(setWeatherError(data as ForecastError))
      console.error('Error fetching weather data:', data);
    }
  }

  const getForecastHandler = () => {
    getForecast();
    getWeather();
  }

  const handleBlur = () => {
    if (!city) {
      setCity(value.label);
    }
  };

  return (
    <div className='mb-5'>
      <div className='flex items-center justify-center gap-2 flex-wrap w-full mb-5'>
        <div className='relative flex flex-wrap w-full sm:w-auto'>
          <label
            htmlFor="city"
            className="w-full text-xl font-medium text-black text-center sm:w-auto"
            onClick={() => setCity('')}
          >
            Enter your city:
          </label>
          <input className='h-9 w-full sm:w-auto min-w-72 ml-2 border-b border-black outline-none text-lg font-normal leading-9' type="text" id='city' value={city} onChange={(e) => getCities(e.target.value)} onBlur={handleBlur} onClick={() => setCity('')}/>
          {options && <GeoList 
            options={options} 
            setCity={setCity} 
            setOptions={setOptions}
            setValue={setValue}
            city={city}
            value={value}
          />}
        </div>
        <button className='h-9 py-1.5 px-1 rounded-md outline outline-1 -outline-offset-1 outline-black' onClick={getForecastHandler}>Get forecast</button>
      </div>

    </div>
  )
}

export default GeoSearch