import styled from 'styled-components';
import { CommonTitleStyle } from 'styles/common';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Title = styled(CommonTitleStyle)``;
export const DevBooksBox = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;

  @media ${({ theme }) => theme.device.tablet} {
    gap: 5px;
  }
`;

export const Image = styled.img`
  width: 100px;
  aspect-ratio: 3/ 4;
`;
