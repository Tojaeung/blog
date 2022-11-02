import Link from 'next/link';
import React from 'react';
import { Container, Profile, TypographyBox, IntroMySelf, Title, MyName, Slogan, ImageBox, GoAboutMe } from './style';

function Intro() {
  return (
    <Container>
      <TypographyBox>
        <Title>DevLog...</Title>
        <IntroMySelf>
          안녕하세요 !!
          <br />
          백엔드 개발자
          <br />
          <MyName>토재웅</MyName> 입니다.
        </IntroMySelf>
        <Slogan>
          첫째도 기본!! 둘째도 기본!! <br />
          기본에 충실하자 !!
        </Slogan>

        <Link href="/about">
          <GoAboutMe>About Me</GoAboutMe>
        </Link>
      </TypographyBox>

      <ImageBox>
        <Profile src="/images/profile.jpg" width="300" height="300" alt="프로필사진" />
      </ImageBox>
    </Container>
  );
}

export default Intro;
