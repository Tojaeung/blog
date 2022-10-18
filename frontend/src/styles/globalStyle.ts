import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';

export const GlobalStyles = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
    text-decoration: none;
    font-family: 'Noto Sans KR', sans-serif;
  }
  
  html {
    font-size: 62.5%;
  }

`;
