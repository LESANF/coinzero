import { ICoin, ICoinDetail } from '../Api/coinInfo';

/**
 *
 * @param detailCoin 코인 Detail Data
 * @param coinInfo 전체 코인 목록(krw, eng명 포함)
 * @returns
 */
export const getCombine = (coinInfo: ICoin[], detailCoin: ICoinDetail[]) => {
    let data = [];
    for (let i = 0; i < coinInfo.length; i++) {
        for (let j = 0; j < detailCoin?.length; j++) {
            if (coinInfo[i].market === detailCoin[j].market)
                data.push(Object.assign(coinInfo[i], detailCoin[j]));
        }
    }

    return data;
};

/**
 *
 * @param detailCoin 코인 Detail Data
 * @param coinList 전체 코인 목록(krw, eng명 포함)
 * @returns
 */
export const getCombineRank = (detailCoin: ICoinDetail[], coinList: ICoin[]) => {
    let data = [];

    for (let i = 0; i < detailCoin.length; i++) {
        for (let j = 0; j < coinList.length; j++) {
            if (detailCoin[i].market === coinList[j].market)
                data.push(Object.assign(detailCoin[i], coinList[j]));
        }
    }

    return data;
};
