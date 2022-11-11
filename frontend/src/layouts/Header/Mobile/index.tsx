import Link from 'next/link';
import React, { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';

import Search from 'components/Search';
import Logo from 'components/Logo';

import { Container, Background, Nav, MenuBox, MenuList, CloseIcon } from './style';

function Mobile() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Container>
      <Logo />
      <GiHamburgerMenu size="30" onClick={onToggle} />

      <Background isOpen={isOpen}>
        <Nav isOpen={isOpen}>
          <CloseIcon size="30" onClick={onToggle} />
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
        </Nav>
      </Background>
    </Container>
  );
}

export default Mobile;
