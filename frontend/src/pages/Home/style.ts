import styled from 'styled-components';
import { CommonTitleStyle } from 'styles/common';

export const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

export const Box = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px;

  @media ${({ theme }) => theme.device.laptop} {
    flex-direction: column;
  }
`;

export const Title = styled(CommonTitleStyle)``;
