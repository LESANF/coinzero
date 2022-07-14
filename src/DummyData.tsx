export interface IBannerContents {
    title: string;
    innerTitle: string;
    innerSummary: string;
    urlImg: string;
}

export function BannerDummyContents() {
    const dummy = {
        result: [
            {
                title: 'WE 신규 상장',
                innerTitle: '위바이(WE) 신규 상장',
                innerSummary: '[7월 1일] 상장 소식을 자세히 확인하세요',
                urlImg: 'https://image-public.coinone.co.kr/_data/images/banner_web_notice_terms.png',
            },
            {
                title: '소개! VIP프로그램',
                innerTitle: '코인원 VIP 프로그램 안내',
                innerSummary: '새롭게 초대한 친구와 함께할 추가 혜택을 확인해 주세요',
                urlImg: 'https://image-public.coinone.co.kr/_data/images/cover-banner-003.png',
            },
            {
                title: '친구와 리워드 받자',
                innerTitle: '친구 1인당 X 1만원 리워드',
                innerSummary: '새롭게 초대한 친구와 함께할 추가 혜택을 확인해 주세요',
                urlImg: 'https://image-public.coinone.co.kr/_data/images/cover-banner-004.png',
            },
            {
                title: '친구와 리워드 받자',
                innerTitle: '친구 1인당 X 1만원 리워드',
                innerSummary: '새롭게 초대한 친구와 함께할 추가 혜택을 확인해 주세요',
                urlImg: 'https://image-public.coinone.co.kr/_data/images/cover-banner-004.png',
            },
            {
                title: '친구와 리워드 받자',
                innerTitle: '친구 1인당 X 1만원 리워드',
                innerSummary: '새롭게 초대한 친구와 함께할 추가 혜택을 확인해 주세요',
                urlImg: 'https://image-public.coinone.co.kr/_data/images/cover-banner-004.png',
            },
            {
                title: '친구와 리워드 받자',
                innerTitle: '친구 1인당 X 1만원 리워드',
                innerSummary: '새롭게 초대한 친구와 함께할 추가 혜택을 확인해 주세요',
                urlImg: 'https://image-public.coinone.co.kr/_data/images/cover-banner-004.png',
            },
        ],
    };

    return dummy;
}
