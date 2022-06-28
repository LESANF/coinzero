import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import SpoqaRegular from './Styles/fonts/spoqa/SpoqaHanSansNeo-Regular.otf';

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
    background-color: peru ;
    width: 100vw;
    height: 100vh;
    overflow: auto;
  }

  a{
    text-decoration:none;
    color:#000;
  }
`;

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <GlobalStyles />
        <App />
    </React.StrictMode>
);
