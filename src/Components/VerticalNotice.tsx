import styled from 'styled-components';
import { Autoplay } from 'swiper';
import { SwiperModule } from 'swiper/types';
import { Swiper, SwiperSlide } from 'swiper/react';

const Frame = styled.div`
    margin-top: 25px;
    height: 60px;
    border: 2px solid red;
`;

const swiperSetting: SwiperModule = {
    modules: [Autoplay],
    direction: 'vertical',
    loop: true,
    autoplay: { delay: 4000, disableOnInteraction: false },
    speed: 550,
};

const swiperStyle = {
    height: '60px',
    backgroundColor: 'peru',
};

function VerticalNotice() {
    return (
        <Frame>
            {swiperSetting && (
                <Swiper {...swiperSetting} style={swiperStyle}>
                    <SwiperSlide>1</SwiperSlide>
                    <SwiperSlide>2</SwiperSlide>
                    <SwiperSlide>3</SwiperSlide>
                    <SwiperSlide>4</SwiperSlide>
                </Swiper>
            )}
        </Frame>
    );
}

export default VerticalNotice;
