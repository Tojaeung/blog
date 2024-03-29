import styled from 'styled-components';
import { CommonBadgeStyle, CommonTextStyle, CommonTitleStyle } from 'styles/common';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 30px;
`;

export const TitleBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
export const PostCntBadge = styled(CommonBadgeStyle)`
  background-color: ${({ theme }) => theme.palette.white};
  color: ${({ theme }) => theme.palette.mainColor};
  font-size: 26px;

  @media ${({ theme }) => theme.device.tablet} {
    font-size: 20px;
  }
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 16px;
  }

  &:hover {
    background-color: ${({ theme }) => theme.palette.mainColor};
    color: ${({ theme }) => theme.palette.white};
  }
`;

export const Title = styled(CommonTitleStyle)`
  font-size: 40px;
  @media ${({ theme }) => theme.device.tablet} {
    font-size: 30px;
  }
`;
export const Detail = styled(CommonTextStyle)`
  font-size: 25px;
  @media ${({ theme }) => theme.device.tablet} {
    font-size: 20px;
  }
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 16px;
  }
`;
