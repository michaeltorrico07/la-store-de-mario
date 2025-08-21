import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import type { Product } from '../product';
import { Link } from 'react-router-dom';

interface CarouselProps {
  data: Product[]
}

export const Carousel = ({ data }: CarouselProps) => {
  return (
    <Swiper
        spaceBetween={32}
        slidesPerView={'auto'}
        slidesOffsetBefore={16}
        slidesOffsetAfter={16}
        >
      {data.map((product, index) => {
        if (!product.inMenu) return null
        return (
        <SwiperSlide
          key={index}
          style={{
            width: '130px',
            height: '220px',
          }}
          >
          <Link to={`${product.id}`} state={{product}}>
            <div className='h-full w-full space-y-1 flex flex-col mt-2'>
              <div className="w-full aspect-square flex items-center justify-center rounded-lg shadow-[0_0_8px_rgba(0,0,0,0.3)]">
                <img
                  className="max-w-28 max-h-28 min-w-14 min-h-14 object-contain object-center"
                  src={product.image}
                  alt={product.name}
                />
              </div>
                <div className='space-y-1.5 flex flex-col mt-1'>
                  <div className='font-normal leading-4 text-sm'>{product.name}</div>
                  <div className='font-bold size-3'>${product.price}</div>
              </div>
            </div>
          </Link>
        </SwiperSlide>
      )})}
    </Swiper>

  );
}
