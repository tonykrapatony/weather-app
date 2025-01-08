import { FC } from 'react'
import { ForecastItem, Weather } from '../../types'
import getWindDirection from '../../helpers/getWindDirection';

type ForecastValuesProps = {
  values: ForecastItem | Weather;
}

const ForecastValues: FC<ForecastValuesProps> = ({ values }) => {
  return (
    <>
      <div className="flex items-center gap-1">
        {values.main.temp > 0 ?
          <img src={`${import.meta.env.BASE_URL}/assets/images/hot_icon.png`} alt="" width={40} /> :
          <img src={`${import.meta.env.BASE_URL}/assets/images/cold_icon.png`} alt="" width={40} />
        }
        <p>Temperature: {values.main.temp} &deg;C</p>
      </div>
      <div className="flex items-center gap-1">
        {values.main.feels_like > 0 ?
          <img src={`${import.meta.env.BASE_URL}/assets/images/hot_icon.png`} alt="" width={40} /> :
          <img src={`${import.meta.env.BASE_URL}/assets/images/cold_icon.png`} alt="" width={40} />
        }
        <p>Feels like: {values.main.feels_like} &deg;C</p>
      </div>
      <div className="flex items-center gap-1">
        <img src={`${import.meta.env.BASE_URL}/assets/images/humidity_icon.png`} alt="" width={40} />
        <p>Humidity: {values.main.humidity} %</p>
      </div>
      <div className="flex items-center gap-1">
        <img src={`${import.meta.env.BASE_URL}/assets/images/wind_icon.png`} alt="" width={40} />
        <p>Wind:</p>
      </div>
      <p className='pl-2'>speed: {values.wind.speed} meter/sec</p>
      <div className='flex gap-2'>
        <p className='pl-2'>direction: {getWindDirection(values.wind.deg)}</p>
        <img style={{ transform: `rotate(${values.wind.deg}deg)` }} src="/assets/images/arrow_icon.png" alt="" width={15} height={15} />
      </div>
    </>
  )
}

export default ForecastValues