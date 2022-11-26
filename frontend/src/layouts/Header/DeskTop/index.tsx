import React from 'react';
import { Link } from 'react-router-dom';
import Logo from 'components/Logo';
import Search from 'components/Search';
import { Container, MenuBox, MenuList } from './style';

function DeskTop() {
  return (
    <Container>
      <Logo />
      <Search />

      <MenuBox>
        <Link to='/about'>
          <MenuList>About</MenuList>
        </Link>
        <Link to='/blog'>
          <MenuList>Blog</MenuList>
        </Link>
        <Link to='/tag'>
          <MenuList>Tags</MenuList>
        </Link>
        <Link to='/contact'>
          <MenuList>Contact</MenuList>
        </Link>
      </MenuBox>
    </Container>
  );
}

export default DeskTop;
