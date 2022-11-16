import Image from 'next/image';
import styled, { keyframes } from 'styled-components';
import { CommonTextStyle, CommonTitleStyle } from 'styles/globalStyle';

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 30px;
  margin-top: 30px;

  @media ${({ theme }) => theme.device.tablet} {
    flex-direction: column;
  }
`;
export const AboutBox = styled.div`
  width: 85%;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media ${({ theme }) => theme.device.tablet} {
    width: 100%;
  }
`;

export const Title = styled(CommonTitleStyle)``;

export const ProfileBox = styled.div`
  display: flex;
  gap: 20px;

  @media ${({ theme }) => theme.device.tablet} {
    flex-direction: column;
  }
`;

export const IntroBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
export const IntroMySelf = styled(CommonTextStyle)`
  font-size: 20px;
  font-weight: bold;
`;
export const MyName = styled.span`
  color: purple;
  font-weight: bold;
`;
export const IntroList = styled(CommonTextStyle)``;

export const CV = styled(CommonTextStyle)`
  font-size: 18px;
  line-height: 40px;

  @media ${({ theme }) => theme.device.mobile} {
    font-size: 16px;
  }
`;

export const GitHubImage = styled.img`
  cursor: pointer;
`;
export const SolvedacImage = styled.img`
  width: 50%;
  height: 50%;
  cursor: pointer;
  @media ${({ theme }) => theme.device.mobile} {
    width: 100%;
    height: 100%;
  }
`;
