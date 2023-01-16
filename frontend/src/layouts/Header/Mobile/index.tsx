import { Link } from 'react-router-dom';
import { useState } from 'react';
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
            <Link to='/blog'>
              <S.MenuList>블로그</S.MenuList>
            </Link>
            <Link to='/tag'>
              <S.MenuList>#태그</S.MenuList>
            </Link>
            <Link to='/guestbook'>
              <S.MenuList>방명록</S.MenuList>
            </Link>
            <a href='https://soundcloud.com/tojaeung' target='_blank' rel='noreferrer'>
              <S.MenuList>음악</S.MenuList>
            </a>
          </S.MenuBox>
        </S.Nav>
      </S.Background>
    </S.Container>
  );
}

export default Mobile;
