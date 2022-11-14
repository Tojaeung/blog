import styled from 'styled-components';
import { CommonTextStyle, CommonTitleStyle } from 'styles/globalStyle';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Title = styled(CommonTitleStyle)``;

export const Detail = styled(CommonTextStyle)``;

export const ViewerBg = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.palette.white};
  padding: 20px;
  border-radius: 5px;

  @media ${({ theme }) => theme.device.tablet} {
    padding: 10px;
  }
  @media ${({ theme }) => theme.device.mobile} {
    padding: 5px;
  }
`;
