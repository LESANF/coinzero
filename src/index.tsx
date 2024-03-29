import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import SpoqaRegular from "./Styles/fonts/spoqa/SpoqaHanSansNeo-Regular.otf";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
// import { ReactQueryDevtools } from "react-query/devtools";
// import { useLocation } from "react-router-dom";

const queryClient = new QueryClient();
const GlobalStyles = createGlobalStyle`
  /*css-reset을 위한 GlobalStyle설정 */
  ${reset}

  /*apply local font */
  @font-face {
    font-family: 'Spoqa Han Sans';
    src: local('Spoqa Han Sans'),
    url(${SpoqaRegular}) format('otf');
  }

  body{
    font-family: 'Spoqa Han Sans';
    min-width: 1124px;
    background-color: #fafafa;
  }

  a{
    text-decoration:none;
    color:#000;
  }

  div{
    box-sizing:border-box;
  }
`;

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <>
    <QueryClientProvider client={queryClient}>
      <GlobalStyles />
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </QueryClientProvider>
  </>
);
