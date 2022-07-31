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
                title: '11111111',
                innerTitle: '11111111',
                innerSummary: '[7월 1일] 상장 소식을 자세히 확인하세요',
                urlImg: 'https://image-public.coinone.co.kr/_data/images/banner_web_notice_terms.png',
            },
            {
                title: '22222222',
                innerTitle: '22222222',
                innerSummary: '새롭게 초대한 친구와 함께할 추가 혜택을 확인해 주세요',
                urlImg: 'https://image-public.coinone.co.kr/_data/images/cover-banner-003.png',
            },
            {
                title: '33333333',
                innerTitle: '33333333',
                innerSummary: '새롭게 초대한 친구와 함께할 추가 혜택을 확인해 주세요',
                urlImg: 'https://image-public.coinone.co.kr/_data/images/cover-banner-004.png',
            },
            {
                title: '44444444',
                innerTitle: '44444444',
                innerSummary: '새롭게 초대한 친구와 함께할 추가 혜택을 확인해 주세요',
                urlImg: 'https://image-public.coinone.co.kr/_data/images/cover-banner-004.png',
            },
            {
                title: '55555555',
                innerTitle: '55555555',
                innerSummary: '새롭게 초대한 친구와 함께할 추가 혜택을 확인해 주세요',
                urlImg: 'https://image-public.coinone.co.kr/_data/images/cover-banner-004.png',
            },
            {
                title: '66666666',
                innerTitle: '66666666',
                innerSummary: '새롭게 초대한 친구와 함께할 추가 혜택을 확인해 주세요',
                urlImg: 'https://image-public.coinone.co.kr/_data/images/cover-banner-004.png',
            },
        ],
    };

    return dummy;
}
