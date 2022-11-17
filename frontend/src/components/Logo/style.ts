import styled from 'styled-components';

export const LogoBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const LogoImg = styled.img``;
export const Typography = styled.p`
  font-size: 40px;
  font-family: ${({ theme }) => theme.font.logo};
  font-weight: bold;
  cursor: pointer;
`;
