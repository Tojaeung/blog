import Link from 'next/link';
import React, { useState } from 'react';
import Search from 'components/Search';
import { Container, LogoBox, LogoImg, LogoTypography, MenuBox, MenuList, SearchInput } from './style';

function DeskTop() {
  return (
    <Container>
      <Link href="/">
        <LogoBox>
          <LogoImg />
          <LogoTypography>TOJAEUNG</LogoTypography>
        </LogoBox>
      </Link>

      <Search />

      <MenuBox>
        <Link href="/about">
          <MenuList>About Me</MenuList>
        </Link>
        <Link href="/blog">
          <MenuList>Blog</MenuList>
        </Link>
        <Link href="/contact">
          <MenuList>Contact</MenuList>
        </Link>
      </MenuBox>
    </Container>
  );
}

export default DeskTop;
