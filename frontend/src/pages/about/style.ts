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

export const CertificateBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const CertificateTitle = styled(CommonTitleStyle)``;
export const CertificateImages = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;

  @media ${({ theme }) => theme.device.tablet} {
    gap: 5px;
  }
`;
export const CertificatePlan = styled.div`
  width: 200px;
  background-color: ${({ theme }) => theme.palette.white};
  border: 1px solid;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  text-align: center;
  color: ${({ theme }) => theme.palette.textColor};
`;

export const DevBooksBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const DevBooksTitle = styled(CommonTitleStyle)``;
export const DevBooksImages = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;

  @media ${({ theme }) => theme.device.tablet} {
    gap: 5px;
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
