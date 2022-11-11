import styled from 'styled-components';
import { CommonBadgeStyle } from 'styles/globalStyle';

export const CategoryBox = styled.ul`
  align-self: flex-start;
  width: 15%;
  display: flex;
  flex-direction: column;
  gap: 15px;
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
`;
