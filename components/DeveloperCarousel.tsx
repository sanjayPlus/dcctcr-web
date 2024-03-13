import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/bundle';
import { Autoplay, EffectCoverflow, Zoom } from 'swiper/modules';
function DeveloperCarousel() {
    const slides = [];
    for (let i = 1; i <= 18; i++) {
        slides.push(<SwiperSlide key={i} ><img src={`/developers/${i}.png`} className='w-[100%] bg-cover rounded-lg' alt="" /></SwiperSlide>);
      }

    return (
        <>
            <div className='w-full'>
                <Swiper
                          effect={'coverflow'}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                    centeredSlides={true}
                    modules={[
                        Autoplay,
                        Zoom,
                        EffectCoverflow
                    ]}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                    grabCursor={true}
                    slidesPerView={'auto'}
                    coverflowEffect={{
                      rotate: 0,
                      stretch: 0,
                      depth: 100,
                      modifier: 2.5,
                    }}
                >

                    {slides}
                </Swiper>
            </div>
        </>
    )
}

export default DeveloperCarousel