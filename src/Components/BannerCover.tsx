import styled from 'styled-components';
import SwiperCore, { Navigation, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import '../../node_modules/swiper/swiper.scss'; // core Swiper
import '../../node_modules/swiper/modules/navigation/navigation.scss'; // Navigation module
import '../../node_modules/swiper/modules/pagination/pagination.scss'; // Pagination module
import { motion } from 'framer-motion';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import React, { useEffect, useRef, useState } from 'react';
import { SwiperModule } from 'swiper/types';
import { BannerDummyContents } from '../DummyData';

//BannerFrame
const MainBanner = styled.div`
    margin-top: 68px;
    background-color: black;
    //width: 100vw;
    //min-width: 1800px;
    height: 274px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media screen and (max-width: 600px) {
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
const Keyword = styled.li<{ isActive: number; idx: number }>`
    cursor: pointer;
    color: #fff;
    opacity: ${(props) => (props.isActive !== props.idx ? '0.3' : 1)};
    border-bottom: ${(props) => (props.isActive === props.idx ? '2px solid #fff' : 'none')};
    padding: 10px 0 5px 0;
    &:first-child {
        margin: 0;
    }
    margin-left: 15px;
`;

const BannerBody = styled.div`
    cursor: pointer;
    position: relative;
    height: 164px;
`;

const BannerContents = styled.div`
    /* width: 100%; */
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

const ContentBox = styled.div`
    display: flex;
    height: 100%;
    width: 589px;
    min-width: 589px;
`;

const ContentText = styled.div`
    /* width: 50%; */
    width: 295px;
    min-width: 295px;
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
    /* width: 50%; */
    min-width: 294px;
    width: 294px;
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

//Banner Keyword List Btn
const KeyWordBtn = styled.button`
    position: relative;
    margin-right: 22px;
    background-color: transparent;
    border: 1px solid #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 24px;
    width: 24px;
    border-radius: 3px;
    cursor: pointer;
`;
const BtnMark = styled.span`
    color: #fff;
    height: 13px;
    width: 13px;
`;

const BtnKeyWordList = styled.ul<{ visible: boolean }>`
    display: ${(props) => (props.visible ? 'list-item' : 'none')};
    position: absolute;
    top: 28px;
    right: 0;
    width: 186px;
    max-height: 256px;
    padding: 18px 18px 15px;
    border-radius: 3px;
    box-shadow: 0 2px 3px 0 rgb(0 0 0 / 16%);
    background-color: #fff;
    z-index: 20;
`;
const BtnKeyWordItem = styled.li<{ isActive: number; idx: number }>`
    cursor: pointer;
    opacity: ${(props) => (props.isActive !== props.idx ? '0.2' : 1)};
    font-size: 14px;
    text-align: left;
    font-weight: 700;
    margin-top: 9px;
    &:first-child {
        margin: 0;
    }
`;

//Swiper
const swiperStyle = {
    fontSize: '100px',
    color: 'blue',
    margin: 0,
};

const swiperSlideStyle = {
    backgroundColor: 'white',
    width: '635px',
};

function BannerCover() {
    //get Dummy Data
    const bannerContents = BannerDummyContents();

    //Swiper Props, custom Navigation
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    //Keyword Btn Active
    const [btnActive, setBtnActive] = useState(false);
    const handleBtnClick = () => {
        setBtnActive((prev) => !prev);
    };

    //slideTo
    const [keyWordSwiper, setKeyWordSwiper] = useState<SwiperCore>();
    const [slideActiveIdx, setSlideActiveIdx] = useState(0);

    const handleKeyWordClick = (i: number) => {
        if (keyWordSwiper) keyWordSwiper.slideTo(i, 1000);
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
                slidesPerView: 'auto',
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
                <KeyWordBtn onClick={handleBtnClick}>
                    <BtnMark>{btnActive ? <FiChevronUp /> : <FiChevronDown />}</BtnMark>
                    <BtnKeyWordList visible={btnActive}>
                        {bannerContents.result.map((v, i) => (
                            <BtnKeyWordItem
                                onClick={() => handleKeyWordClick(i)}
                                key={i}
                                isActive={slideActiveIdx}
                                idx={i}
                            >{`# ${v.title}`}</BtnKeyWordItem>
                        ))}
                    </BtnKeyWordList>
                </KeyWordBtn>
                <KeywordList>
                    {bannerContents.result.map((v, i) => (
                        <Keyword
                            onClick={() => handleKeyWordClick(i)}
                            key={i}
                            isActive={slideActiveIdx}
                            idx={i}
                        >{`# ${v.title}`}</Keyword>
                    ))}
                </KeywordList>
            </BannerHeader>
            <BannerBody>
                {swiperSetting && (
                    <Swiper
                        {...swiperSetting}
                        style={swiperStyle}
                        onSwiper={setKeyWordSwiper}
                        onSlideChange={(swiper) => setSlideActiveIdx(swiper.realIndex)}
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
        </MainBanner>
    );
}

export default BannerCover;
