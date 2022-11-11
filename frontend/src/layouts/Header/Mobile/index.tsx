import Link from 'next/link';
import React, { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';

import { Container, LogoBox, LogoImg, LogoTypography, Background, Nav, MenuBox, MenuList, CloseIcon } from './style';
import Search from 'components/Search';

function Mobile() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Container>
      <Link href="/">
        <LogoBox>
          <LogoImg />
          <LogoTypography>TOJAEUNG</LogoTypography>
        </LogoBox>
      </Link>
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
