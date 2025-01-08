import { FC } from 'react'
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import type { Forecast } from '../../types';
import ForecastList from './ForecastList';
import ForecastValues from './ForecastValues';


const Forecast: FC = () => {
  const forecast = useSelector((state: RootState) => state.forecast.forecast);
  const weather = useSelector((state: RootState) => state.forecast.weather);
  const forecastError = useSelector((state: RootState) => state.forecast.forecastError);
  const weatherError = useSelector((state: RootState) => state.forecast.weatherError);

  return (
    <div className='p-4 mt-5'>
      {weatherError && <p className='text-red'>{weatherError.message}</p>}
      {weather?.cod === 200 &&
        <>
          <div className='flex items-start gap-4'>
            <div>
              <div className="flex items-center gap-1">
                <p className='text-3xl'>{forecast?.city?.name}</p>
                <img src="/assets/images/location_icon.png" alt="" width={20}/>
              </div>
              <p className='text-lg'>{new Date().toLocaleString('ua-UK', { month: 'numeric', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', })}</p>
              <img src={`/assets/images/${weather.weather[0].icon}.png`} alt="" />
            </div>
            <div className='flex flex-col gap-2'>
              <ForecastValues values={weather}/>
              <div className="flex items-center gap-1">
                <img src="/assets/images/sunrise_icon.png" alt="" width={40}/>
                <p>Sunrise {new Date(forecast?.city?.sunrise).toLocaleTimeString()}</p>
              </div>
              <div className="flex items-center gap-1">
                <img src="/assets/images/sunset_icon.png" alt="" width={40}/>
                <p>Sunset {new Date(forecast?.city?.sunset).toLocaleTimeString()}</p>
              </div>
            </div>
          </div>
        </>
      }
      {forecastError && <p className='text-red'>{forecastError.message}</p>}
      <ForecastList forecast={forecast}/>
    </div>
  )
}

export default Forecast