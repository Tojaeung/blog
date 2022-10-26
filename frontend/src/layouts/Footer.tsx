import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <Container>
      <LogoBox>
        <LogoImg />
        <LogoTypography>Tojaeung</LogoTypography>
      </LogoBox>

      <CopyRightText>Copyrightⓒ 2022 Tojaeung All Rights Reserved</CopyRightText>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px;
`;
const LogoBox = styled.div``;
const LogoImg = styled.img``;
const LogoTypography = styled.p`
  font-size: 20px;
  font-weight: bold;
`;
const CopyRightText = styled.p`
  font-size: 17px;
`;

export default Footer;
