import styled from 'styled-components';
import { CommonBadgeStyle, CommonCardStyle, CommonTextStyle } from 'styles/common';

export const PostBox = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media ${({ theme }) => theme.device.tablet} {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
  @media ${({ theme }) => theme.device.mobile} {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

export const PostList = styled(CommonCardStyle)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
`;

export const PostImage = styled.img`
  width: 100%;
`;

export const Title = styled.h1`
  margin-top: 10px;
  font-size: 23px;
  font-family: Noto Sans KR;
  font-weight: bold;
`;

export const Content = styled.div``;

export const TagBox = styled.div`
  display: flex;
  gap: 5px;
`;
export const TagBadge = styled(CommonBadgeStyle)``;

export const Detailed = styled(CommonTextStyle)``;
