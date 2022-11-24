import styled from 'styled-components';
import { CommonCardStyle, CommonTextStyle } from 'styles/globalStyle';

export const PostBox = styled.ul`
  width: 85%;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media ${({ theme }) => theme.device.laptop} {
    width: 100%;
  }
`;

export const PostList = styled(CommonCardStyle)`
  width: 100%;
  height: 180px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

export const ImageBox = styled.div`
  width: 20%;

  @media ${({ theme }) => theme.device.tablet} {
    display: none;
  }
`;

export const TextBox = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;

  justify-content: space-between;
  @media ${({ theme }) => theme.device.tablet} {
    width: 100%;
  }
`;
export const Title = styled.h1`
  font-size: 23px;
  font-family: Noto Sans KR;
  font-weight: bold;
`;

export const Detailed = styled(CommonTextStyle)``;
