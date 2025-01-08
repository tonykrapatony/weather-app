import { FC, useEffect, useState } from 'react'
import Item from './ForecastItem'
import { Forecast, ForecastItem } from '../../types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import Arrow from '../UI/Arrow';

type ForecastListProps = {
  forecast: Forecast;
}

const ForecastList: FC<ForecastListProps> = ({ forecast }) => {
  const [sortedForecast, setSortedForecast] = useState<Record<string, ForecastItem[]> | null>(null);
  const [activeDate, setActiveDate] = useState<Date>(new Date());
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  useEffect(() => {
    if (forecast?.list?.length > 0) {
      const groupedForecast = forecast.list.reduce((acc: Record<string, ForecastItem[]>, cur) => {
        const date: string = cur.dt_txt.split(' ')[0];
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(cur);
        return acc;
      }, {});
      setSortedForecast(groupedForecast);
    }
  }, [forecast]);


  return (
    <div className='mt-8'>
      {sortedForecast && <>
        <div className="relative">
          <Swiper
            onSwiper={(swiper) => setSwiperInstance(swiper)}
            slidesPerView={5}
            breakpoints={{
              1024: {
                slidesPerView: Object.entries(sortedForecast).length,
              },
              768: {
                slidesPerView: 3,
              },
              425: {
                slidesPerView: 2,
              },
              0: {
                slidesPerView: 2,
              },
            }}
            grabCursor={true}
            className='flex items-center justify-between'
          >
            {Object.entries(sortedForecast).map(([date]) => (
              <SwiperSlide key={date}>
                <button
                  className={`w-full sm:min-w-40 px-2 py-4 border border-black rounded-t-md text-2xl ${new Date(date).toLocaleDateString() === new Date(activeDate).toLocaleDateString() ? 'shadow-custom bg-yellowLight border-b-transparent' : ''}`}
                  onClick={() => setActiveDate(new Date(date))}
                >
                  {date}
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="absolute top-0 -left-8 flex items-center justify-between w-full-64 h-full lg:hidden">
            <Arrow
              onclick={() => swiperInstance && swiperInstance.slidePrev()}
              width={32}
              direction='left'
            />
            <Arrow
              onclick={() => swiperInstance && swiperInstance.slideNext()}
              width={32}
              direction='right'
            />
          </div>
        </div>
        {Object.entries(sortedForecast).map(([date, items]) => (
          <Item key={date} forecastItem={items} date={date} activeDate={activeDate} />
        ))}

      </>}
    </div>
  )
}

export default ForecastList