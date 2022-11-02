import styled from 'styled-components';
import Image from 'next/image';
import { CommonButtonStyle, CommonTextStyle } from 'styles/globalStyle';

export const Container = styled.div`
  width: 100%;
  margin: 20px auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: salmon;
  padding: 10px;
`;

export const TypographyBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
`;
export const Title = styled.span`
  background-color: yellow;
  font-size: 30px;
  font-weight: bold;
  text-align: center;
`;
export const IntroMySelf = styled(CommonTextStyle)`
  font-size: 25px;

  font-weight: bold;
  line-height: 50px;
`;
export const MyName = styled.span`
  color: purple;
  font-weight: bold;
`;
export const Slogan = styled(CommonTextStyle)`
  color: gray;
  font-size: 15px;
`;

export const ImageBox = styled.div`
  border-radius: 50%;
  border: 5px double;
`;
export const Profile = styled(Image)`
  border-radius: 50%;
`;

export const GoAboutMe = styled(CommonButtonStyle)`
  background: linear-gradient(120deg, #4a90e2, #bd10e0);
  color: white;
`;
