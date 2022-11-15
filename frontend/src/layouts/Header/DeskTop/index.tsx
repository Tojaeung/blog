import Link from 'next/link';
import React from 'react';
import Logo from 'components/Logo';
import Search from 'components/Search';
import { Container, MenuBox, MenuList } from './style';

function DeskTop() {
  return (
    <Container>
      <Logo />
      <Search />

      <MenuBox>
        <Link href="/about">
          <MenuList>About Me</MenuList>
        </Link>
        <Link href="/blog">
          <MenuList>Blog</MenuList>
        </Link>
        <Link href="/tag">
          <MenuList>Tags</MenuList>
        </Link>
        <Link href="/contact">
          <MenuList>Contact</MenuList>
        </Link>
      </MenuBox>
    </Container>
  );
}

export default DeskTop;
