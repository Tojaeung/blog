import styled, { keyframes } from 'styled-components';
import { CommonInputStyle } from 'styles/globalStyle';

const jittery = keyframes`
  5%,
  50% {
    transform: scale(1);
  }

  10% {
    transform: scale(0.9);
  }

  15% {
    transform: scale(1.15);
  }

  20% {
    transform: scale(1.15) rotate(-5deg);
  }

  25% {
    transform: scale(1.15) rotate(5deg);
  }

  30% {
    transform: scale(1.15) rotate(-3deg);
  }

  35% {
    transform: scale(1.15) rotate(2deg);
  }

  40% {
    transform: scale(1.15) rotate(0);
  }


`;
export const Container = styled.div`
  width: 1000px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.palette.mainColor};
  @media ${({ theme }) => theme.device.laptop} {
    display: none;
  }
`;

export const LogoBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    animation: ${jittery} 4s infinite;
  }
`;
export const LogoImg = styled.img``;
export const LogoTypography = styled.p`
  font-size: 40px;
  font-family: ${({ theme }) => theme.font.logo};
  letter-spacing: 5px;
  font-weight: bold;
`;

export const SearchInput = styled(CommonInputStyle)`
  width: 200px;
`;

export const MenuBox = styled.ul`
  display: flex;
  gap: 20px;
  font-size: 20px;
  font-family: 'Roboto';
  font-weight: bold;
  color: ${({ theme }) => theme.palette.textColor};
`;
export const MenuList = styled.li`
  cursor: pointer;
  transition: all 0.5s;

  &:hover {
    color: ${({ theme }) => theme.palette.black};
  }
`;
