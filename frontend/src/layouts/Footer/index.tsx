import React from 'react';
import { Container, CopyRightText, LogoBox, LogoImg, LogoTypography } from './style';

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

export default Footer;
