import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Forecast, ForecastError, Weather } from '../types'

type InitialStateType = {
  forecast: Forecast;
  weather: Weather;
  forecastError: ForecastError | null;
  weatherError: ForecastError | null;
}

const initialState: InitialStateType = {
  forecast: {
    cod: '',
    message: 0,
    cnt: 0,
    list: [],
    city: {
      id: 0,
      name: '',
      coord: {
        lat: 0,
        lon: 0,
      },
      country: '',
      population: 0,
      timezone: 0,
      sunrise: 0,
      sunset: 0,
    },
  },
  weather: {
    weather: [
      {
        id: 0,
        main: '',
        description: '',
        icon: '',
      }
    ],
    main: {
        temp: 0,
        feels_like: 0,
        humidity: 0,
    },
    wind: {
      speed: 0,
      deg: 0,
      gust: 0,
    },
    timezone: 0,
    id: 0,
    name: '',
    cod: 0,
  },
  forecastError: null,
  weatherError: null
}

export const forecastSlice = createSlice({
  name: 'forecast',
  initialState,
  reducers: {
    setForecast: (state, action: PayloadAction<Forecast>) => {
      state.forecast = action.payload
      if (action.payload) {
        state.forecastError = null;
      }
    },
    setWeather: (state, action: PayloadAction<Weather>) => {
      state.weather = action.payload
      if (action.payload) {
        state.weatherError = null;
      }
    },
    setForecastError: (state, action: PayloadAction<ForecastError>) => {
      state.forecastError = action.payload
    },
    setWeatherError: (state, action: PayloadAction<ForecastError>) => {
      state.weatherError = action.payload
    },
  },
})

export const { setForecast, setWeather, setForecastError, setWeatherError } = forecastSlice.actions

export default forecastSlice.reducer