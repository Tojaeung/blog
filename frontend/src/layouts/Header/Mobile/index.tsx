import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';

import Search from 'components/Search';
import Logo from 'components/Logo';

import * as S from './style';

function Mobile() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <S.Container>
      <Logo />
      <GiHamburgerMenu size='30' onClick={onToggle} />

      <S.Background isOpen={isOpen}>
        <S.Nav isOpen={isOpen}>
          <S.CloseIcon size='30' onClick={onToggle} />
          <Search />
          <S.MenuBox>
            <Link to='/about'>
              <S.MenuList>About</S.MenuList>
            </Link>
            <Link to='/blog'>
              <S.MenuList>Blog</S.MenuList>
            </Link>
            <Link to='/tag'>
              <S.MenuList>Tags</S.MenuList>
            </Link>
            <Link to='/contact'>
              <S.MenuList>Contact</S.MenuList>
            </Link>
          </S.MenuBox>
        </S.Nav>
      </S.Background>
    </S.Container>
  );
}

export default Mobile;
