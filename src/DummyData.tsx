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
        title: "신규 가입&2만 원",
        innerTitle: "신규 가입 회원에게 2만 원 증정",
        innerSummary: "코인원 첫 거래를 통해 2만 원 리워드를 받아가세요!",
        urlImg: "https://image-public.coinone.co.kr/_data/images/cover-banner-004.png",
      },
      {
        title: "체크! 약관변경",
        innerTitle: "코인원 이용약관 변경 안내",
        innerSummary: "변경된 내용을 확인해 주세요",
        urlImg: "https://image-public.coinone.co.kr/_data/images/banner_web_notice_terms.png",
      },
      {
        title: "소개!VIP프로그램",
        innerTitle: "코인원 VIP 프로그램 안내",
        innerSummary: "코인원 VIP의 차별화된 혜택을 경험하세요",
        urlImg: "https://image-public.coinone.co.kr/_data/images/cover-banner-006.png",
      },
      {
        title: "친구와 리워드 받자",
        innerTitle: "친구 1인당 X 1만원 리워드",
        innerSummary: "새롭게 초대한 친구와 함께할 추가 혜택을 확인해 주세요",
        urlImg: "https://image-public.coinone.co.kr/_data/images/cover-banner-referral.png",
      },
    ],
  };

  return dummy;
}
