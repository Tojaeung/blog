import styled, { createGlobalStyle, keyframes } from 'styled-components';
import { reset } from 'styled-reset';

export const GlobalStyles = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
    text-decoration: none;
  }
  
  html {
    font-size: 62.5%;
  }
`;

const button = keyframes`
  from {
    background: linear-gradient(120deg, #4a90e2, #bd10e0);
  }

  to {
    background: linear-gradient(120deg, #bd10e0,#4a90e2);
  }
`;

export const CommonTitleStyle = styled.h1`
  font-size: 30px;
  color: ${({ theme }) => theme.palette.titleColor};
  font-family: ${({ theme }) => theme.font.title};
`;

export const CommonInputStyle = styled.input`
  outline: none;
  padding: 10px;
  border-radius: 5px;
  font-size: 14px;
  border: none;
  background-color: ${({ theme }) => theme.palette.inputColor};
  color: ${({ theme }) => theme.palette.black};
`;
export const CommonButtonStyle = styled.button`
  outline: none;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  background: ${({ theme }) => theme.palette.gradationColor};
  color: ${({ theme }) => theme.palette.white};
  font-family: Roboto;

  &:hover {
    animation: ${button} 1s ease infinite;
  }
`;

export const CommonTextStyle = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.palette.textColor};
`;

export const CommonSelectStyle = styled.select`
  outline: none;
  padding: 10px;
  border-radius: 5px;
`;

export const CommonOptionStyle = styled.option`
  font-size: 16px;
`;

export const CommonBadgeStyle = styled.li`
  text-align: center;
  font-size: 14px;
  font-weight: bold;
  border-radius: 5px;
  padding: 10px 15px;
  list-style: none;
  cursor: pointer;
  background-color: ${({ theme }) => theme.palette.badgeColor};
  color: ${({ theme }) => theme.palette.black};
  box-shadow: ${({ theme }) => theme.palette.boxShdow};
  transition: all 0.5s;

  &:hover {
    background-color: ${({ theme }) => theme.palette.mainColor};
    color: ${({ theme }) => theme.palette.white};
  }

  @media ${({ theme }) => theme.device.mobile} {
    font-size: 12px;
    font-weight: bold;
    padding: 5px 10px;
  }
`;

export const CommonCardStyle = styled.li`
  border-radius: 10px;
  cursor: pointer;
  padding: 15px;
  background-color: ${({ theme }) => theme.palette.white};
  box-shadow: ${({ theme }) => theme.palette.boxShdow};
  transition: all 0.5s;

  &:hover {
    transform: scale(1.05, 1.05);
  }
`;
