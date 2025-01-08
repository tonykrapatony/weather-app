export type Option = {
  value: {
    lat: string;
    lon: string;
  }; 
  label: string
}

export type City = { 
  state: string; 
  name: string; 
  lat: number; 
  lon: number;
}

export type Forecast = {
  cod: string;
  message: number;
  cnt: number;
  list: ForecastItem[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  }
}

export type ForecastError = {
  cod: number | string;
  message: string;
}

export type Error = {
  error: string;
}

export type ForecastItem = {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: ForecastWeather[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  visibility: number;
  pop: number;
  sys: {
    pod: string;
  };
  dt_txt: string;
}

type ForecastWeather = {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export type Weather = {
    weather: ForecastWeather[];
    main: {
        temp: number;
        feels_like: number;
        humidity: number;
    },
    wind: {
      speed: number;
      deg: number;
      gust: number;
    },
    timezone: number;
    id: number;
    name: string;
    cod: number | string;
}