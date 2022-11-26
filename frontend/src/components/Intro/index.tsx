import { Link } from 'react-router-dom';
import React from 'react';
import * as S from './style';

function Intro() {
  return (
    <S.Container>
      <S.TypographyBox>
        <S.IntroMySelf>
          안녕하세요 !!
          <br />
          백엔드 개발자
          <br />
          <S.MyName>토재웅</S.MyName> 입니다.
        </S.IntroMySelf>
        <S.Slogan>
          첫째도 기본!! 둘째도 기본!! <br />
          기본에 충실하자 !!
        </S.Slogan>

        <Link to='/guestbook'>
          <S.GuestbookButton>방명록 남기기</S.GuestbookButton>
        </Link>
      </S.TypographyBox>
      <S.ImageBox>
        <S.Profile src='/images/profile.jpg' width='300' height='300' alt='프로필사진' />
      </S.ImageBox>
    </S.Container>
  );
}

export default Intro;
