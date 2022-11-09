import styled from 'styled-components';
import { CommonTitleStyle } from 'styles/globalStyle';

export const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const TitleBox = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;
export const Title = styled(CommonTitleStyle)``;
export const AllPostsCnt = styled.span`
  background-color: red;
  font-size: 16px;
  padding: 5px;
  border-radius: 5px;
  color: white;
`;
