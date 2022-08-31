export interface IBannerContents {
    title: string;
    innerTitle: string;
    innerSummary: string;
    urlImg: string;
}

export interface IVerNotice {
    time: number;
    title: string;
    summary: string;
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

export function verNoticeDummyData() {
    const dummy = {
        result: [
            {
                time: 6,
                title: '파라과이 대통령, 암호화폐 채굴 산업 인정 법안 거부',
                summary: `코인텔레그래프에 따르면 마리오 아브도 베니테스 파라과이 대통령이 월요일(현지시간) 암호화폐 채굴을 산업 활동으로 인정하는 법안에 대해 거부권을 행사했다. 채굴로 인한 높은 전력 소비가 지속 가능한 국가 산업의 확장을 방해할 수 있다는 이유에서다. 파라과이 상원은 지난 7월 14일(현지시간) 암호화폐 시장 규제 법안을 가결했었다. 법안에 따르면 채굴자는 잉여 에너지를 경쟁력 있는 가격으로 사용할 수 있으며, 파라과이에서 운영되는 암호화폐 회사에 부가세(VAT)가 면제된다. 대통령이 서명하면 법안은 최종 발효될 예정이었으나 이번 거부권 행사로 무산됐다.`,
            },
            {
                time: 14,
                title: '컴파운드, 코드 버그 발견.. cETH 동결 조치',
                summary: `코인데스크에 따르면 디파이 대출 프로토콜 컴파운드(COMP)는 이더리움(ETH)의 공급자와 차용인간의 거래를 되돌리는 코드에서 버그를 발견, 컴파운드 이더리움(cETH)의 거래를 중단했다. 컴파운드는 코드 수정까지 7일이 소요될 것이라고 전했다. 이번 문제에 대해서 컴파운드는 “인터페이스가 현재 로딩되지 않고 있지만, 곧 다시 작동할 것”라고 트위터를 통해 밝혔다. 코인마켓캡 기준 COMP는 현재 3.41% 내린 47.96 달러에 거래되고 있다.`,
            },
            {
                time: 20,
                title: '보고서 “비트코인 네트워크, 탄소 배출량 제로 구현 가능“',
                summary: `코인텔레그래프가 벤처캐피탈리스트 출신 환경 운동가 다니엘 배튼(Daniel Batten) 보고서를 인용, 비트코인 네트워크의 탄소 배출량이 궁극적으로 제로에 도달할 수 있다고 전했다. 보고서는 포집된 메탄가스를 연료로 활용해 비트코인 채굴에 활용하면 지금의 탄소 배출량을 63%까지 줄일 수 있다면서, “비트코인 네트워크의 1.57%가 메탄가스를 활용하면 전체 네트워크의 탄소 집약도를 -4.2% 낮출 수 있다“고 분석했다. 미디어는 또 아일랜드 소재 재생에너지 채굴업체 Scilling Digital Mining을 인용, “비트코인 채굴은 메탄가스 포집을 위한 촉매제가 될 수 있다. 온실가스 배출량의 1/3을 차지하는 농업 폐가스를 포집해 환경오염을 줄이고 BTC 채굴로 추가 수익을 얻을 수 있다“고 덧붙였다.`,
            },
            {
                time: 46,
                title: "크립토 '공포·탐욕 지수' 23... 투심 위축",
                summary: `암호화폐 데이터 제공 업체 알터너티브(Alternative)의 자체 추산 '공포·탐욕 지수'가 전날 대비 4포인트 하락한 23을 기록했다.투심이 위축되며 공포 단계에서 극단적 공포 단계로 전환됐다. 해당 지수는 0에 가까울수록 시장의 극단적 공포를 나타내며, 100에 가까울수록 극단적 낙관을 의미한다. 공포 탐욕 지수는 변동성(25%), 거래량(25%), SNS 언급량(15%), 설문조사(15%), 비트코인 시총 비중(10%), 구글 검색량(10%) 등을 기준으로 산출된다.`,
            },
            {
                time: 120,
                title: '메이커다오 "33억 달러 USDC·4.99억 달러 USDP, PSM 준비금으로 할당"',
                summary: `메이커다오가 공식 트위터를 통해 프로토콜이 보유하고 있는 33억 달러의 USDC 및 4.99억 달러의 USDP를 PSM 준비금에 할당했다고 밝혔다. PSM은 Peg Stability Module의 약자로, 일반 스왑 플랫폼과 달리 슬리피지 없는 1:1 토큰 스왑을 제공한다. 예를들어 이용자가 1000만 달러의 USDC, USDP 혹은 GUSD를 PSM에 넣을 경우 1000만 DAI를 획득할 수 있다는 의미다.`,
            },
            {
                time: 180,
                title: '유럽 로비그룹 총장 "EU 27개국 달러 고정 스테이블코인 금지할 수도"',
                summary: `유럽 로비그룹인 '유럽을 위한 블록체인(Blockchain for Europe)' 총장 로버트 코피취(Robert Kopitsch)가 코인데스크와의 인터뷰를 통해 "EU가 합의한 암호화폐 규제법안 미카(MiCA)가 통과되면 27개국이 미국 달러에 고정된 스테이블코인을 금지할 수 있다"고 말했다.`,
            },
        ],
    };

    return dummy;
}
