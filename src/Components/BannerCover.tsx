import styled from 'styled-components';
import SwiperCore, { Navigation, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import '../../node_modules/swiper/swiper.scss'; // core Swiper
import '../../node_modules/swiper/modules/navigation/navigation.scss'; // Navigation module
import '../../node_modules/swiper/modules/pagination/pagination.scss'; // Pagination module
import { motion } from 'framer-motion';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import { useEffect, useRef, useState } from 'react';
import { SwiperModule } from 'swiper/types';

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

//Banner
const BannerHeader = styled.div`
    height: 30px;
    background-color: green;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const KeywordList = styled.ul`
    display: flex;
`;
const Keyword = styled.li`
    &:first-child {
        margin: 0;
    }
    margin-left: 10px;
`;

const BannerBody = styled.div`
    position: relative;
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

//Banner Slider Items
const Contents = styled(motion.div)`
    width: 589px;
    height: 164px;
`;

const ContentBox = styled.div`
    display: flex;
    height: 100%;
    min-width: 589;
`;

const ContentText = styled.div`
    width: 50%;
    min-width: 294px;
`;

const ContentImg = styled.div`
    width: 50%;
    min-width: '294px';
    background-image: url('https://image-public.coinone.co.kr/_data/images/banner_web_notice_terms.png');
    background-size: cover;
    background-position: center center;
`;

//Prev, Next Btn
const PrevBtn = styled.span`
    cursor: pointer;
    top: calc(50% - 12px);
    left: calc(50% - 326px);
    position: absolute;
    display: inline-block;
    font-size: 24px;
    color: #aeb3bb;
    z-index: 10;
`;
const NextBtn = styled.span`
    cursor: pointer;
    top: calc(50% - 12px);
    right: calc(50% - 333px);
    position: absolute;
    display: inline-block;
    font-size: 24px;
    color: #aeb3bb;
    z-index: 10;
`;

const contentVari = {
    noneActiveInit: {
        opacity: 0.2,
    },
    activeInit: {
        opacity: 1,
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

//swiper style obj
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
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    //Swiper Props, custom Navigation
    const [swiperSetting, setSwiperSetting] = useState<SwiperModule | null>(null);
    useEffect(() => {
        if (!swiperSetting) {
            setSwiperSetting({
                modules: [Autoplay, Navigation],
                navigation: { prevEl: prevRef.current, nextEl: nextRef.current },
                onBeforeInit: (swiper: SwiperCore) => {
                    if (typeof swiper.params.navigation !== 'boolean') {
                        if (swiper.params.navigation) {
                            swiper.params.navigation.prevEl = prevRef.current;
                            swiper.params.navigation.nextEl = nextRef.current;
                        }
                    }
                    swiper.navigation.update();
                },
                loop: true,
                slidesPerView: 3,
                autoplay: { delay: 4000, disableOnInteraction: false },
                speed: 550,
                centeredSlides: true,
                touchRatio: 0,
            });
        }
    }, [swiperSetting]);

    return (
        <MainBanner>
            <BannerHeader>
                <button>ㅁ</button>
                <KeywordList>
                    {['keyword1', 'keyword2', 'keyword3', 'keyword4', 'keyword5'].map((v, i) => (
                        <Keyword key={i}>{`# ${v}`}</Keyword>
                    ))}
                </KeywordList>
            </BannerHeader>
            <BannerBody>
                {swiperSetting && (
                    <Swiper {...swiperSetting} style={swiperStyle}>
                        {[1, 2, 3, 4, 5].map((v, i) => (
                            <SwiperSlide key={i} style={swiperSlideStyle}>
                                {({ isActive }) => (
                                    <BannerContents>
                                        <Contents
                                            variants={contentVari}
                                            initial={isActive ? 'activeInit' : 'noneActiveInit'}
                                            animate={isActive ? 'active' : 'noneActive'}
                                        >
                                            <ContentBox>
                                                <ContentText>text</ContentText>
                                                <ContentImg></ContentImg>
                                            </ContentBox>
                                        </Contents>
                                    </BannerContents>
                                )}
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
                <PrevBtn ref={prevRef}>
                    <MdArrowBackIos />
                </PrevBtn>
                <NextBtn ref={nextRef}>
                    <MdArrowForwardIos />
                </NextBtn>
            </BannerBody>
            {/* <BannerProtector /> */}
        </MainBanner>
    );
}

export default BannerCover;
