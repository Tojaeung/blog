import styled from 'styled-components';
import { CommonTextStyle, CommonTitleStyle } from 'styles/globalStyle';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: ${({ theme }) => theme.palette.white};
  padding: 20px;
  border-radius: 5px;
`;

export const Title = styled(CommonTitleStyle)``;

export const Detail = styled(CommonTextStyle)``;

export const Line = styled.hr`
  width: 100%;
`;
