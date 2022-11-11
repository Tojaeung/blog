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
  background: ${(props) => (props.currentPage ? props.theme.palette.textColor : props.theme.palette.badgeColor)};
  color: ${(props) => (props.currentPage ? props.theme.palette.white : props.theme.palette.textColor)};
  cursor: ${(props) => (props.currentPage ? 'none' : 'pointer')};
  font-weight: bold;
  transition: all 0.5s;

  &:hover {
    background: ${(props) => (props.currentPage ? props.theme.palette.textColor : props.theme.palette.mainColor)};
    color: ${({ theme }) => theme.palette.white};
  }
`;

export const ArrowButton = styled(CommonButtonStyle)`
  background: ${({ theme }) => theme.palette.badgeColor};
  color: ${({ theme }) => theme.palette.textColor};
  font-weight: bold;
  transition: all 0.5s;
  &:hover {
    background: ${({ theme }) => theme.palette.mainColor};
    color: ${({ theme }) => theme.palette.white};
  }
`;
