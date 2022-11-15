import styled from 'styled-components';
import { CommonBadgeStyle } from 'styles/globalStyle';

export const Container = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const TagBadge = styled(CommonBadgeStyle)`
  display: flex;
  align-items: center;
  gap: 3px;
  padding: 4px 7px;
`;

export const TagName = styled.span``;
