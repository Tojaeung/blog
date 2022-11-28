import styled from 'styled-components';
import { CommonBadgeStyle } from 'styles/common';

export const CategoryBox = styled.ul`
  align-self: flex-start;
  width: 15%;
  display: flex;
  flex-direction: column;
  gap: 15px;

  @media ${({ theme }) => theme.device.laptop} {
    width: 100%;
  }
`;

export const Title = styled.h1`
  font-size: 25px;
  font-family: Roboto;
  font-weight: bold;
  align-self: center;
`;

export const Badge = styled(CommonBadgeStyle)`
  font-weight: bold;
  text-align: left;

  @media ${({ theme }) => theme.device.laptop} {
    text-align: center;
  }
`;
