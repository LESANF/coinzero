import styled from 'styled-components';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper';
import { Swiper, SwiperSlide } from '../../node_modules/swiper/react/swiper-react.js';
import '../../node_modules/swiper/swiper.scss'; // core Swiper
import '../../node_modules/swiper/modules/navigation/navigation.scss'; // Navigation module
import '../../node_modules/swiper/modules/pagination/pagination.scss'; // Pagination module
import { useRef, useState } from 'react';

const MainBanner = styled.div`
    background-color: gray;
    width: 100vw;
    height: 400px;
    display: flex;
    align-items: center;
`;

{
    /* <Swiper
                modules={[Autoplay, EffectCoverflow]}
                grabCursor={true}
                centeredSlides={true}
                effect="coverflow"
                style={{ height: '360px' }}
                coverflowEffect={{
                    rotate: 10,
                }}
                loop={true}
                spaceBetween={50}
                slidesPerView={4}
                autoplay={{ delay: 1000 }}
            >
                {[1, 2, 3, 4, 5].map((v, i) => {
                    return (
                        <SwiperSlide
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                fontSize: '36px',
                            }}
                            key={i}
                        >
                            {v}
                        </SwiperSlide>
                    );
                })}
            </Swiper> */
}

const swiperStyle = {
    // height: '100%',
    backgroundColor: 'red',
    fontSize: '100px',
    color: 'blue',
};

const swiperSlideStyle = {
    backgroundColor: 'white',
};

function BannerCover() {
    const sliderRef = useRef<any>(null);
    console.log(sliderRef.current?.className);
    return (
        <MainBanner>
            <Swiper
                modules={[Autoplay]}
                loop={true}
                slidesPerView={3}
                spaceBetween={10}
                autoplay={{ delay: 2000 }}
                speed={1500}
                centeredSlides={true}
                style={swiperStyle}
            >
                {[1, 2, 3, 4, 5].map((v) => (
                    <SwiperSlide style={swiperSlideStyle}>
                        {({ isActive }) => <span style={{ opacity: isActive ? 1 : 0.2 }}>{v}</span>}
                    </SwiperSlide>
                ))}
            </Swiper>
        </MainBanner>
    );
}

export default BannerCover;
