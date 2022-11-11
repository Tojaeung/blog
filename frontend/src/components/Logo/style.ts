import styled, { keyframes } from 'styled-components';

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

export const LogoBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const LogoImg = styled.img``;
export const Typography = styled.p`
  font-size: 40px;
  font-family: ${({ theme }) => theme.font.logo};
  font-weight: bold;
  cursor: pointer;

  &:hover {
    animation: ${jittery} 2s infinite;
  }
`;
