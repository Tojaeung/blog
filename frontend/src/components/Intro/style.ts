import styled from 'styled-components';
import { CommonTextStyle, CommonTitleStyle } from 'styles/common';
// import { CommonButtonStyle, CommonTextStyle } from 'styles/common';
// import { jittery } from 'styles/animation';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

export const Banner = styled.img`
  width: 100%;
  height: 100%;
  filter: brightness(40%);
  z-index: 10;
`;

export const BlogName = styled(CommonTitleStyle)`
  font-size: 50px;
  position: absolute;
  color: ${({ theme }) => theme.palette.white};
  z-index: 11;
  top: 50%;
  left: 50%;
  white-space: nowrap;
  transform: translate(-50%, -50%);

  @media ${({ theme }) => theme.device.tablet} {
    font-size: 46px;
  }
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 30px;
  }
`;

export const Content = styled(CommonTextStyle)`
  position: absolute;
  color: ${({ theme }) => theme.palette.white};
  z-index: 11;
  top: 70%;
  left: 50%;
  white-space: nowrap;
  transform: translate(-50%, -50%);

  @media ${({ theme }) => theme.device.tablet} {
    top: 80%;
  }
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 12px;
  }
`;
