import styled from 'styled-components';
import { CommonBadgeStyle, CommonTitleStyle } from 'styles/common';
import { jittery } from 'styles/animation';

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
  /* animation: ${jittery} 5s infinite; */
`;

export const TagName = styled.span``;
