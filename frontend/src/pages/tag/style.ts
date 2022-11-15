import styled, { keyframes } from 'styled-components';
import { CommonBadgeStyle, CommonTitleStyle } from 'styles/globalStyle';

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

export const Container = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 30px;
`;

export const Title = styled(CommonTitleStyle)``;
export const TagBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

export const TagBadge = styled(CommonBadgeStyle)`
  display: flex;
  align-items: center;
  gap: 3px;
  animation: ${jittery} 7s infinite;
`;

export const TagName = styled.span``;
