import styled from 'styled-components';
import { CommonTextStyle, CommonTitleStyle } from 'styles/globalStyle';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

export const TitleBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
export const PostsCnt = styled.div`
  font-size: 20px;
  background-color: red;
  padding: 10px;
`;

export const Title = styled(CommonTitleStyle)``;
export const Detail = styled(CommonTextStyle)``;
