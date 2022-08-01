export function getCoinInfo() {
    return fetch(
        'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json'
    )
        .then((res) => res.json())
        .then((data) => data.slice(0, 100));
}

export interface ICoin {
    market: string;
    korean_name: string;
    english_name: string;
}

export function getMarketCoin() {
    return fetch('https://api.upbit.com/v1/market/all').then((res) => res.json());
}
