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

export const ImageBox = styled.div`
  width: 800px;
  margin: 0 auto;
`;
