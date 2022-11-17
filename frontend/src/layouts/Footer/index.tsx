import React from 'react';

import * as S from './style';
import Link from 'next/link';

const Footer = () => {
  return (
    <S.Container>
      <S.Logo>Tojaeung</S.Logo>

      <S.IconBox>
        <Link href="https://github.com/Tojaeung">
          <a>
            <S.GithubIcon size={25} color="black" />
          </a>
        </Link>
        <Link href="https://www.instagram.com/tojaeung1027">
          <a>
            <S.InstaIcon size={25} color="black" />
          </a>
        </Link>
        <Link href="https://solved.ac/tojaeung">
          <a>
            <S.BrainIcon size={25} color="black" />
          </a>
        </Link>
        <Link href="https://soundcloud.com/tojaeung">
          <a>
            <S.SoundcloudIcon size={25} color="black" />
          </a>
        </Link>
      </S.IconBox>

      <S.CopyRightText>Copyrightⓒ 2022 Tojaeung All Rights Reserved</S.CopyRightText>
    </S.Container>
  );
};

export default Footer;
