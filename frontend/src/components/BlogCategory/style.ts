import styled from 'styled-components';
import { CommonBadgeStyle } from 'styles/common';

export const Container = styled.ul`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  cursor: pointer;
`;

export const Badge = styled(CommonBadgeStyle)<{ currentPage: boolean }>`
  background-color: ${(props) => (props.currentPage ? props.theme.palette.mainColor : props.theme.palette.white)};
  color: ${(props) => (props.currentPage ? props.theme.palette.white : props.theme.palette.black)};

  &:hover {
    background-color: ${({ theme }) => theme.palette.mainColor};
    color: ${({ theme }) => theme.palette.white};
  }
`;
