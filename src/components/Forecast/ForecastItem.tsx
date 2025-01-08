import { FC, useState } from 'react'
import type { ForecastItem } from '../../types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import 'swiper/swiper-bundle.css';
import Arrow from '../UI/Arrow';
import ForecastValues from './ForecastValues';

type ForecastItemProps = {
  forecastItem: ForecastItem[];
  date: string;
  activeDate: Date;
}

const Item: FC<ForecastItemProps> = ({ forecastItem, date, activeDate }) => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  return (
    <>
      {new Date(date).toLocaleDateString() === new Date(activeDate).toLocaleDateString() &&
        <div className='p-4 border border-t-0 border-black bg-yellowLight rounded-b-md'>

          <Swiper
            className='gap-0'
            slidesPerView={1}
            spaceBetween={10}
            noSwiping={true}
            wrapperClass='items-stretch'
            onSwiper={(swiper) => setSwiperInstance(swiper)}
            breakpoints={
              {
                0: {
                  slidesPerView: 1,
                },
                640: {
                  slidesPerView: 2,
                },
                768: {
                  slidesPerView: 3,
                },
                1024: {
                  slidesPerView: 4,
                },
              }
            }
          >
            {forecastItem.map((item, index) => (

              <SwiperSlide
                className="flex flex-col h-auto gap-2 py-4 px-3 border border-black rounded-md"
                key={`${date}-${index}`}
              >
                <p className='text-lg'>{new Date(item.dt_txt).toLocaleString('ua-UK', {
                  month: 'numeric',
                  day: 'numeric',
                  year: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                })}</p>
                <ForecastValues values={item} />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="flex justify-center gap-4 mt-2">
            <Arrow
              onclick={() => swiperInstance && swiperInstance.slidePrev()}
              width={40}
              direction='left'
            />
            <Arrow
              onclick={() => swiperInstance && swiperInstance.slideNext()}
              width={40}
              direction='right'
            />
          </div>
        </div>
      }
    </>
  )
}

export default Item