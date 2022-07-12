import styled from 'styled-components';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper';
import { Swiper, SwiperSlide } from '../../node_modules/swiper/react/swiper-react.js';
import '../../node_modules/swiper/swiper.scss'; // core Swiper
import '../../node_modules/swiper/modules/navigation/navigation.scss'; // Navigation module
import '../../node_modules/swiper/modules/pagination/pagination.scss'; // Pagination module
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';

const MainBanner = styled.div`
    background-color: gray;
    width: 100vw;
    min-width: 1920px;
    height: 274px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media screen and (max-width: 500px) {
        display: none;
    }
`;

const BannerHeader = styled.div`
    height: 30px;
    background-color: green;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const KeywordList = styled.ul`
    display: flexs;
`;
const Keyword = styled.li`
    &:first-child {
        margin: 0;
    }
    margin-left: 10px;
`;

const BannerBody = styled.div`
    height: 164px;
    background-color: yellow;
`;

const BannerContents = styled.div`
    width: 100%;
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Content = styled(motion.div)`
    width: 589px;
    height: 164px;
`;

const contentVari = {
    initial: {
        opacity: 0.2,
    },
    active: {
        opacity: 1,
        transition: {
            delay: 1,
        },
    },
    noneActive: {
        opacity: 0.2,
    },
};

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
    fontSize: '100px',
    color: 'blue',
    margin: 0,
};

const swiperSlideStyle = {
    backgroundColor: 'white',
};

function BannerCover() {
    return (
        <MainBanner>
            <BannerHeader>
                <button>ㅁ</button>
                <KeywordList>
                    {['keyword1', 'keyword2', 'keyword3', 'keyword4', 'keyword5'].map((v) => (
                        <Keyword>{`# ${v}`}</Keyword>
                    ))}
                </KeywordList>
            </BannerHeader>
            <BannerBody>
                <Swiper
                    modules={[Autoplay]}
                    loop={true}
                    slidesPerView={3}
                    spaceBetween={10}
                    autoplay={{ delay: 4000 }}
                    speed={550}
                    centeredSlides={true}
                    style={swiperStyle}
                >
                    {[1, 2, 3, 4, 5].map((v, i) => (
                        <SwiperSlide key={i} style={swiperSlideStyle}>
                            {({ isActive }) => (
                                <BannerContents>
                                    <Content
                                        variants={contentVari}
                                        initial="initial"
                                        animate={isActive ? 'active' : 'noneActive'}
                                    >
                                        <div style={{ display: 'flex', height: '100%', minWidth: '589px' }}>
                                            <div style={{ width: '50%', minWidth: '294px' }}>text</div>
                                            <div
                                                style={{
                                                    backgroundImage: `url(${'https://image-public.coinone.co.kr/_data/images/banner_web_notice_terms.png'})`,
                                                    width: '50%',
                                                    minWidth: '294px',
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center center',
                                                }}
                                            ></div>
                                        </div>
                                    </Content>
                                </BannerContents>
                            )}
                        </SwiperSlide>
                    ))}
                </Swiper>
            </BannerBody>
        </MainBanner>
    );
}

export default BannerCover;
