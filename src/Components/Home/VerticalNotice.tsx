import styled from 'styled-components';
import { Autoplay } from 'swiper';
import { SwiperModule } from 'swiper/types';
import { Swiper, SwiperSlide } from 'swiper/react';

const Frame = styled.div`
    height: 60px;
    grid-area: item1;
    @media screen and (max-width: 600px) {
        display: none;
    }
`;

const Notice = styled.a`
    cursor: pointer;
    padding: 20px 0;
    align-items: center;
    display: flex;
    align-items: flex-start;
    border-top: 1px solid #e4e5e8;
`;

const NoticeSummary = styled.div`
    padding: 0 12px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const NoticeText = styled.span`
    width: 300px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #000;
    font-size: 14px;
    margin-bottom: 3px;
`;

const NoticeDate = styled.span`
    font-size: 10px;
    color: #7f8794;
`;

const NoticeTag = styled.span`
    margin-top: -3px;
    white-space: nowrap;
    float: left;
    display: flex;
    align-items: center;
    height: 20px;
    line-height: 1;
    padding: 0 8px;
    border-radius: 10px;
    background-color: #e4e5e8;
    font-size: 10px;
    color: #484d55;
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
};

function VerticalNotice() {
    return (
        <Frame>
            {swiperSetting && (
                <Swiper {...swiperSetting} style={swiperStyle}>
                    <SwiperSlide>
                        <Notice target="blank" href="https://www.naver.com">
                            <NoticeTag>신규</NoticeTag>
                            <NoticeSummary>
                                <NoticeText>
                                    클레이튼(KLAY) 네트워크 업그레이드를 위한 입출금 일시 중단 안내
                                </NoticeText>
                                <NoticeDate>2022.08.19</NoticeDate>
                            </NoticeSummary>
                        </Notice>
                    </SwiperSlide>
                </Swiper>
            )}
        </Frame>
    );
}

export default VerticalNotice;
