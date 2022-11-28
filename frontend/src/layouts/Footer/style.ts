import styled from 'styled-components';
import { CommonTextStyle } from 'styles/common';
import { AiFillGithub, AiOutlineInstagram } from 'react-icons/ai';
import { GrSoundcloud } from 'react-icons/gr';
import { GiBrain } from 'react-icons/gi';

export const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px;
  margin-top: 20px;
  background-color: ${({ theme }) => theme.palette.mainColor};
`;

export const Logo = styled.h1`
  font-size: 25px;
  font-weight: bold;
  color: ${({ theme }) => theme.palette.titleColor};
  font-family: ${({ theme }) => theme.font.en};
`;

export const IconBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const GithubIcon = styled(AiFillGithub)`
  cursor: pointer;
`;
export const InstaIcon = styled(AiOutlineInstagram)`
  cursor: pointer;
`;
export const SoundcloudIcon = styled(GrSoundcloud)`
  cursor: pointer;
`;
export const BrainIcon = styled(GiBrain)`
  cursor: pointer;
`;

export const CopyRightText = styled(CommonTextStyle)`
  font-size: 14px;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 12px;
  }
`;
