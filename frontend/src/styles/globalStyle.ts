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
  padding: 7px 13px;
  white-space: nowrap;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  background: ${({ theme }) => theme.palette.gradationColor};
  color: ${({ theme }) => theme.palette.white};
  font-family: ${({ theme }) => theme.font.en};
  box-shadow: ${({ theme }) => theme.palette.boxShdow};

  @media ${({ theme }) => theme.device.tablet} {
    font-size: 12px;
    font-weight: bold;
    padding: 7px 10px;
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
  padding: 7px 14px;
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

  @media ${({ theme }) => theme.device.tablet} {
    font-size: 12px;
    font-weight: bold;
    padding: 7px 10px;
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

export const CommonCommentStyle = styled.textarea`
  outline: none;
  padding: 10px;
  border-radius: 5px;
  font-size: 14px;
  border: none;
  background-color: ${({ theme }) => theme.palette.inputColor};
  color: ${({ theme }) => theme.palette.black};
`;
