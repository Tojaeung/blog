import styled from 'styled-components';
import { CommonButtonStyle, CommonTitleStyle } from 'styles/globalStyle';

export const CategoryBox = styled.ul`
  align-self: flex-start;
  width: 15%;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const Title = styled(CommonTitleStyle)`
  /* font-size: 30px; */
  font-weight: bold;
  align-self: center;
`;

export const CategoryList = styled.li`
  padding: 15px;
  background-color: green;
  font-size: 14px;
  border-radius: 5px;
  color: white;
  cursor: pointer;
`;
