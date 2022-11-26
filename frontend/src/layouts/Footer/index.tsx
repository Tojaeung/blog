import React from 'react';
import { Link } from 'react-router-dom';

import * as S from './style';

const Footer = () => {
  return (
    <S.Container>
      <S.Logo>Tojaeung</S.Logo>

      <S.IconBox>
        <Link to='https://github.com/Tojaeung'>
          <S.GithubIcon size={25} color='black' />
        </Link>
        <Link to='https://www.instagram.com/tojaeung1027'>
          <S.InstaIcon size={25} color='black' />
        </Link>
        <Link to='https://solved.ac/tojaeung'>
          <S.BrainIcon size={25} color='black' />
        </Link>
        <Link to='https://soundcloud.com/tojaeung'>
          <S.SoundcloudIcon size={25} color='black' />
        </Link>
      </S.IconBox>

      <S.CopyRightText>Copyrightⓒ 2022 Tojaeung All Rights Reserved</S.CopyRightText>
    </S.Container>
  );
};

export default Footer;
