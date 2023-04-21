import React from "react";
import styled, { keyframes } from "styled-components";

const liFinal = [1, 2, 3];

const loadingKeyframes = keyframes`
    0% {
        transform: translateX(0);
    }
    50%,
    100% {
        transform: translateX(990px);
    }
`;

const loadingKey30 = keyframes`
    0% {
        transform: translateX(0);
    }
    50%,
    100% {
        transform: translateX(30px);
    }
`;

const loadingKey40 = keyframes`
    0% {
        transform: translateX(0);
    }
    50%,
    100% {
        transform: translateX(40px);
    }
`;

const loadingKey60 = keyframes`
    0% {
        transform: translateX(0);
    }
    50%,
    100% {
        transform: translateX(60px);
    }
`;

const loadingKey70 = keyframes`
    0% {
        transform: translateX(0);
    }
    50%,
    100% {
        transform: translateX(80px);
    }
`;
const loadingKey80 = keyframes`
    0% {
        transform: translateX(0);
    }
    50%,
    100% {
        transform: translateX(80px);
    }
`;
const loadingKey90 = keyframes`
    0% {
        transform: translateX(0);
    }
    50%,
    100% {
        transform: translateX(90px);
    }
`;

const loadingKey130 = keyframes`
    0% {
        transform: translateX(0);
    }
    50%,
    100% {
        transform: translateX(140px);
    }
`;

const loadingKey140 = keyframes`
    0% {
        transform: translateX(0);
    }
    50%,
    100% {
        transform: translateX(140px);
    }
`;

const SkeletonSummary = styled.div`
  position: relative;
  background-color: #fff;
  grid-area: summary;
  border-radius: 8px;
  @media screen and (max-width: 600px) {
    display: none;
  }
  /* &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 10px;
    height: 100%;
    background: linear-gradient(to right, #f2f2f2, #ddd, #f2f2f2);
    animation: ${loadingKeyframes} 2s infinite linear;
  } */
`;

const SkeletonCoinFrame = styled.div`
  padding: 20px;
`;

const SkeletonCoinHead = styled.div`
  display: flex;
  align-items: center;
`;

const SkeletonCoinSymbol = styled.span`
  margin-right: 4px;
`;

const SkeletonSymbolImg = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #f2f2f2;
  position: relative;
  overflow: hidden;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 10px;
    height: 100%;
    background: linear-gradient(to right, #f2f2f2, #ddd, #f2f2f2);
    animation: ${loadingKey40} 2s infinite linear;
  }
`;

const SkeletonCoinName = styled.span`
  width: 80px;
  height: 30px;
  margin-left: 4px;
  font-size: 18px;
  line-height: 1.25;
  background: #f2f2f2;
  position: relative;
  overflow: hidden;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 10px;
    height: 100%;
    background: linear-gradient(to right, #f2f2f2, #ddd, #f2f2f2);
    animation: ${loadingKey80} 2s infinite linear;
  }
`;
const SkeletonCoinNameEng = styled.span`
  width: 40px;
  height: 30px;
  text-transform: uppercase;
  font-size: 20px;
  font-weight: 700;
  line-height: 1.25px;
  background: #f2f2f2;
  position: relative;
  overflow: hidden;
`;

const SkeletonPriceFrame = styled.div`
  width: 200px;
  height: 20px;
  display: flex;
  margin-top: 4px;
  align-items: center;
`;

const SkeletonPriceInfo = styled.div`
  width: 60px;
  height: 20px;
  background: #f2f2f2;
  position: relative;
  overflow: hidden;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 10px;
    height: 100%;
    background: linear-gradient(to right, #f2f2f2, #ddd, #f2f2f2);
    animation: ${loadingKey60} 2s infinite linear;
  }
`;

const SkeletonPriceInfo2 = styled.div`
  margin-left: 5px;
  width: 90px;
  height: 20px;
  background: #f2f2f2;
  position: relative;
  overflow: hidden;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 10px;
    height: 100%;
    background: linear-gradient(to right, #f2f2f2, #ddd, #f2f2f2);
    animation: ${loadingKey90} 2s infinite linear;
  }
`;

const SkeletonCoinHLBST = styled.ul`
  display: flex;
  align-items: center;
  font-size: 14px;
  margin-top: 8px;
  li:first-child dt {
    margin-left: 0;
  }
`;

const SkeletonHLBSTInfo = styled.li`
  display: flex;
`;

const SkeletonPriceDl = styled.dl`
  display: flex;
`;
const SkeletonPriceDt = styled.dt`
  width: 30px;
  height: 20px;
  position: relative;
  overflow: hidden;
  background: #f2f2f2;
  margin: 0 4px 0 14px;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 10px;
    height: 100%;
    background: linear-gradient(to right, #f2f2f2, #ddd, #f2f2f2);
    animation: ${loadingKey30} 2s infinite linear;
  }
`;
const SkeletonPriceDd = styled.dd`
  width: 40px;
  height: 20px;
  position: relative;
  overflow: hidden;
  background: #f2f2f2;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 10px;
    height: 100%;
    background: linear-gradient(to right, #f2f2f2, #ddd, #f2f2f2);
    animation: ${loadingKey40} 2s infinite linear;
  }
`;
const SkeletonPriceDt70 = styled.dt`
  width: 70px;
  height: 20px;
  position: relative;
  overflow: hidden;
  background: #f2f2f2;
  margin: 0 4px 0 14px;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 10px;
    height: 100%;
    background: linear-gradient(to right, #f2f2f2, #ddd, #f2f2f2);
    animation: ${loadingKey70} 2s infinite linear;
  }
`;
const SkeletonPriceDd130 = styled.dd`
  width: 130px;
  height: 20px;
  position: relative;
  overflow: hidden;
  background: #f2f2f2;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 10px;
    height: 100%;
    background: linear-gradient(to right, #f2f2f2, #ddd, #f2f2f2);
    animation: ${loadingKey130} 2s infinite linear;
  }
`;

const SkeletonSmallChart = styled.div`
  position: absolute;
  top: 20px;
  right: 50px;
  width: 140px;
  height: 68px;
  background: #f2f2f2;
  border-radius: 6px;
  overflow: hidden;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 10px;
    height: 100%;
    background: linear-gradient(to right, #f2f2f2, #ddd, #f2f2f2);
    animation: ${loadingKey140} 2s infinite linear;
  }
`;

const SkeletonChartFrame = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: #fff;
  border-radius: 8px;
  grid-area: chart;
  @media screen and (max-width: 600px) {
    display: none;
  }
`;

const SkeletonMainChart = styled.div`
  width: 90%;
  height: 90%;
  margin: 20px;
  background: #f2f2f2;
  border-radius: 6px;
  position: relative;
  overflow: hidden;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 10px;
    height: 100%;
    background: linear-gradient(to right, #f2f2f2, #ddd, #f2f2f2);
    animation: ${loadingKeyframes} 2s infinite linear;
  }
`;

const Skeleton = () => {
  return (
    <>
      <SkeletonSummary>
        <SkeletonCoinFrame>
          <SkeletonCoinHead>
            <SkeletonCoinSymbol>
              <SkeletonSymbolImg />
            </SkeletonCoinSymbol>
            <SkeletonCoinName />
          </SkeletonCoinHead>
          <SkeletonPriceFrame>
            <SkeletonPriceInfo />
            <SkeletonPriceInfo2 />
          </SkeletonPriceFrame>
          <SkeletonCoinHLBST>
            {[0, 1, 2].map((v) => {
              return (
                <SkeletonHLBSTInfo key={v}>
                  <SkeletonPriceDl>
                    <SkeletonPriceDt />
                    <SkeletonPriceDd />
                  </SkeletonPriceDl>
                </SkeletonHLBSTInfo>
              );
            })}
            {[3, 4].map((v) => {
              return (
                <SkeletonHLBSTInfo key={v}>
                  <SkeletonPriceDl>
                    <SkeletonPriceDt70 />
                    <SkeletonPriceDd130 />
                  </SkeletonPriceDl>
                </SkeletonHLBSTInfo>
              );
            })}
          </SkeletonCoinHLBST>
        </SkeletonCoinFrame>
        <SkeletonSmallChart></SkeletonSmallChart>
      </SkeletonSummary>
      <SkeletonChartFrame>
        <SkeletonMainChart />
      </SkeletonChartFrame>
    </>
  );
};
export default Skeleton;
