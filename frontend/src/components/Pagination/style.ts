import styled from 'styled-components';
import { CommonButtonStyle } from 'styles/globalStyle';

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 50px 0;
`;

export const PageNumberBox = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const PageButton = styled(CommonButtonStyle)<{ currentPage: boolean }>`
  background-color: ${(props) => (props.currentPage ? 'red' : 'inherit')};
  font-weight: bold;
`;

export const ArrowButton = styled(CommonButtonStyle)`
  font-weight: bold;
`;
