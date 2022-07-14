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
import { BannerDummyContents } from '../DummyData';
import { url } from 'inspector';

const MainBanner = styled.div`
    background-color: black;
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
    margin-bottom: 30px;
    /* background-color: green; */
    display: flex;
    justify-content: center;
    align-items: center;
`;

const KeywordList = styled.ul`
    display: flex;
`;
const Keyword = styled.li`
    cursor: pointer;
    color: #fff;
    &:first-child {
        margin: 0;
    }
    margin-left: 10px;
`;

const BannerBody = styled.div`
    cursor: pointer;
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
    display: grid;
    grid-template-rows: 1.2fr 2fr;
`;

const ContentTitle = styled.div`
    color: #1772f8;
    font-weight: 700;
    font-size: 20px;
    text-align: left;
    padding-top: 18px;
`;
const ContentSummary = styled.div`
    font-size: 14px;
    color: #fff;
    opacity: 0.85;
    padding-right: 91px;
    letter-spacing: 1px;
    line-height: 19px;
`;

const ContentImg = styled.div<{ imgUrl: string }>`
    width: 50%;
    min-width: '294px';
    border-radius: 10px;
    background-image: ${(props) => `url(${props.imgUrl})`};
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
    //get Dummy Data
    const bannerContents = BannerDummyContents();

    //Swiper Props, custom Navigation
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    //slideTo
    const [keyWordSwiper, setKeyWordSwiper] = useState<SwiperCore>();

    const handleKeyWordClick = () => {
        // if(keyWordSwiper) keyWordSwiper.slideTo()
        // console.log(keyWordSwiper);
        keyWordSwiper?.slideTo(0, 1000);
    };
    const handleKeyWord = (activeIdx: number) => {
        // console.log(activeIdx);
        console.log('sliding');
    };

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
                <button style={{ marginRight: '22px' }}>ㅁ</button>
                <KeywordList>
                    {bannerContents.result.map((v, i) => (
                        <Keyword onClick={handleKeyWordClick} key={i}>{`# ${v.title}`}</Keyword>
                    ))}
                </KeywordList>
            </BannerHeader>
            <BannerBody>
                {swiperSetting && (
                    <Swiper
                        {...swiperSetting}
                        style={swiperStyle}
                        onSwiper={setKeyWordSwiper}
                        onSlideChange={(swiper) => handleKeyWord(swiper.activeIndex)}
                    >
                        {bannerContents.result.map((v, i) => (
                            <SwiperSlide key={i} style={swiperSlideStyle}>
                                {({ isActive }) => (
                                    <BannerContents>
                                        <Contents
                                            variants={contentVari}
                                            initial={isActive ? 'activeInit' : 'noneActiveInit'}
                                            animate={isActive ? 'active' : 'noneActive'}
                                        >
                                            <ContentBox>
                                                <ContentText>
                                                    <ContentTitle>{v.innerTitle}</ContentTitle>
                                                    <ContentSummary>{v.innerSummary}</ContentSummary>
                                                </ContentText>
                                                <ContentImg imgUrl={v.urlImg} />
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
