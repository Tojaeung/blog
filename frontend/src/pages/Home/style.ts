import styled from 'styled-components';
import { CommonTitleStyle } from 'styles/common';

export const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Box = styled.div`
  width: 100%;
  display: flex;

  @media ${({ theme }) => theme.device.tablet} {
    flex-direction: column;
  }
`;

export const LeftSideBox = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;

  @media ${({ theme }) => theme.device.tablet} {
    width: 100%;
  }
`;

export const RightSideBox = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  gap: 50px;
  margin: 20px 0;

  @media ${({ theme }) => theme.device.tablet} {
    width: 100%;
  }
`;

export const TitleBox = styled.div`
  display: flex;
  gap: 10px;
`;

export const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export const Title = styled(CommonTitleStyle)`
  margin: 0 auto;
`;
export const HotPostsTitle = styled(CommonTitleStyle)``;
