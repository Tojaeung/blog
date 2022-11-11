import styled from 'styled-components';
import { CommonCardStyle, CommonTextStyle } from 'styles/globalStyle';

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
  /* width: 32.22%; */
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Title = styled.h1`
  margin-top: 10px;
  font-size: 23px;
  font-family: Noto Sans KR;
  font-weight: bold;
`;
export const ViewBox = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
`;
export const Detailed = styled(CommonTextStyle)`
  margin-top: 10px;
`;
