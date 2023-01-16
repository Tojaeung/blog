import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { CommonBadgeStyle, CommonCardStyle, CommonTextStyle } from 'styles/common';

export const PostBox = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
  margin: 20px 0;
  flex-wrap: wrap;

  @media ${({ theme }) => theme.device.tablet} {
    gap: 10px;
  }
  @media ${({ theme }) => theme.device.mobile} {
    gap: 5px;
  }
`;

export const PostLink = styled(Link)`
  width: calc((100% - 40px) / 2);

  @media ${({ theme }) => theme.device.tablet} {
    width: calc((100% - 10px) / 2);
  }

  @media ${({ theme }) => theme.device.mobile} {
    width: 100%;
  }
`;

export const PostList = styled(CommonCardStyle)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
`;

export const PostImage = styled.img`
  aspect-ratio: 1.3333333/ 1;
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
