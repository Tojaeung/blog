import styled, { css, keyframes } from 'styled-components';
import { CommonInputStyle } from 'styles/globalStyle';
import { AiOutlineClose } from 'react-icons/ai';

export const Container = styled.div`
  display: none;
  @media ${({ theme }) => theme.device.laptop} {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export const LogoBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
export const LogoImg = styled.img``;
export const LogoTypography = styled.p`
  font-size: 40px;
  font-family: ${({ theme }) => theme.font.logo};
  letter-spacing: 5px;
  font-weight: bold;
`;

export const Background = styled.div<{ isOpen: boolean }>`
  ${({ isOpen }) => {
    if (isOpen) {
      return css`
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 1;
      `;
    } else {
      return css`
        display: none;
      `;
    }
  }}
`;

const slideNav = keyframes`
  from {
    transform: translateX(0);
  } 

  to {
    transform: translateX(-300px);
  }
`;

export const Nav = styled.div<{ isOpen: boolean }>`
  display: none;
  width: 300px;
  height: 100%;
  position: fixed;
  right: -300px;
  padding: 20px;
  flex-direction: column;
  background-color: ${({ theme }) => theme.palette.white};
  z-index: 2;
  ${({ isOpen }) => {
    if (isOpen) {
      return css`
        display: flex;
        animation: ${slideNav} 0.5s forwards;
      `;
    }
  }}
`;

export const CloseIcon = styled(AiOutlineClose)`
  align-self: flex-end;
`;

export const MenuBox = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-size: 20px;
  font-family: 'Roboto';
  font-weight: bold;
  color: ${({ theme }) => theme.palette.textColor};
  margin-top: 20px;
`;
export const MenuList = styled.li`
  cursor: pointer;
  transition: all 0.5s;
  padding: 20px 0;
  border-bottom: 1px solid ${({ theme }) => theme.palette.textColor};

  &:hover {
    color: ${({ theme }) => theme.palette.black};
  }
`;
