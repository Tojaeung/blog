import styled, { createGlobalStyle } from 'styled-components';
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

export const CommonTitleStyle = styled.h1`
  font-size: 30px;
  font-weight: bold;
`;

export const CommonInputStyle = styled.input`
  outline: none;
  padding: 10px;
  border-radius: 5px;
  font-size: 16px;
`;
export const CommonButtonStyle = styled.button`
  outline: none;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
`;

export const CommonTextStyle = styled.p`
  font-size: 16px;
`;

export const CommonSelectStyle = styled.select`
  outline: none;
  padding: 10px;
  border-radius: 5px;
`;

export const CommonOptionStyle = styled.option`
  font-size: 16px;
`;
