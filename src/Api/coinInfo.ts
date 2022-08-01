export interface ICoin {
    market: string;
    korean_name: string;
    english_name: string;
}

export function getMarketCoin() {
    return fetch('https://api.upbit.com/v1/market/all').then((res) => res.json());
}
