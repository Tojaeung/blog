import styled from 'styled-components';
import { CommonButtonStyle, CommonTextStyle, jittery } from 'styles/common';

export const Container = styled.div`
  width: 100%;
  margin: 20px auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
  color: ${({ theme }) => theme.palette.black};
`;

export const TypographyBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
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
  font-size: 15px;
`;

export const ImageBox = styled.div`
  border-radius: 50%;
  border: 3px solid;
  transition: all 0.5s;
  &:hover {
    transform: skewX(5deg);
  }

  @media ${({ theme }) => theme.device.tablet} {
    display: none;
  }
`;
export const Profile = styled.img`
  border-radius: 50%;
`;

export const GuestbookButton = styled(CommonButtonStyle)`
  font-weight: bold;
  animation: ${jittery} 3s infinite;
`;
