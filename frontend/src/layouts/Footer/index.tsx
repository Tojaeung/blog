import React from 'react';
import { AiFillGithub } from 'react-icons/ai';
import { GrSoundcloud } from 'react-icons/gr';
import { GiBrain } from 'react-icons/gi';

import * as S from './style';
import Link from 'next/link';

const Footer = () => {
  return (
    <S.Container>
      <S.Logo>Tojaeung</S.Logo>

      <S.IconBox>
        <Link href="https://github.com/Tojaeung">
          <AiFillGithub size={25} />
        </Link>
        <Link href="https://solved.ac/tojaeung">
          <GiBrain size={25} />
        </Link>
        <Link href="https://soundcloud.com/tojaeung">
          <GrSoundcloud size={25} />
        </Link>
      </S.IconBox>

      <S.CopyRightText>Copyrightⓒ 2022 Tojaeung All Rights Reserved</S.CopyRightText>
    </S.Container>
  );
};

export default Footer;
