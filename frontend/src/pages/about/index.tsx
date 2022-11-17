import Link from 'next/link';
import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import axios from 'axios';

import { getCategories } from 'apis/category';

import HomeCategory from 'components/HomeCategory';

import * as S from './style';
import { IProp } from './type';
import Image from 'next/image';

const About: NextPage<IProp> = ({ categories }) => {
  return (
    <S.Container>
      <S.AboutBox>
        <S.Title>About Me</S.Title>

        <S.ProfileBox>
          <Image src="/images/cat.gif" width="300" height="300" alt="프로필사진" />

          <S.IntroBox>
            <S.IntroMySelf>
              백엔드 개발자 <S.MyName>토재웅</S.MyName>입니다!!
            </S.IntroMySelf>
            <S.IntroList>- Java, Typescript 언어 사용</S.IntroList>
            <S.IntroList>- Springboot, Node.js를 이용한 웹 서버 개발</S.IntroList>
            <S.IntroList>- RDBMS인 MySQL을 이용한 데이터베이스 구조 설계</S.IntroList>
            <S.IntroList>- RESTful API 설계</S.IntroList>
            <S.IntroList>- JPA에 대한 이해와 사용경험</S.IntroList>
            <S.IntroList>- React를 이용한 SPA 클라이언트 앱 구축 및 기능 개발</S.IntroList>
            <S.IntroList>- Styled-components를 이용한 CSS-in-JS 개발</S.IntroList>
            <S.IntroList>- PC, Mobile 반응형 웹 개발</S.IntroList>
            <S.IntroList>- SEO최적화를 위한 SSR이해와 Next.js 프레임워크 개발</S.IntroList>
            <S.IntroList>- AWS(S3, EC2, RDS) HTTPS 배포 및 서버 배포 자동화</S.IntroList>
          </S.IntroBox>
        </S.ProfileBox>

        <S.CV>
          ✅ 주어진 상황에서 최선을 다해 최선의 해결책을 찾으려고 노력하는 개발자 <br />
          ✅ 경험을 공유하고 함께 성장하는 가치를 가장 중시하는 개발자 <br />
          ✅ 새로운 지식과 기술을 배우는것을 좋아하는 개발자 <br />
          ✅ 나 혼자의 역량만이 아니라 함께하는 팀의 성장을 도울 수 있는 개발자 <br />
          ✅ 비즈니스 임팩트, 좋은 퍼포먼스, 읽기 쉽고 확장에 유연한 코드를 중시하는 개발자 <br />
          ✅ 하늘위에 하늘이 있다는것을 알고 매사 겸손하며 기본에 충실한 개발자 <br />
          ✅ 기획자, 디자이너에게 이해하기 쉽게 친절히 설명할 수 있는 개발자 <br />
          ✅ 1일 1커밋, 1일 1PS(problem solve), 1일 1포스팅 개발에 진심인 개발자 <br />
        </S.CV>

        <S.CertificateBox>
          <S.CertificateTitle>자격증</S.CertificateTitle>
          <S.CertificateImages>
            <Image src="/images/sqld자격증.png" width="200" height="300" alt="sqld자격증" />
            <S.CertificatePlan>
              정보처리기사 <br />
              2023.1 도전예정
            </S.CertificatePlan>
          </S.CertificateImages>
        </S.CertificateBox>

        <S.DevBooksBox>
          <S.DevBooksTitle>개발서적</S.DevBooksTitle>
          <S.DevBooksImages>
            <Image src="/images/sql레벨업.png" width="200" height="300" alt="sql레벨업" />
            <Image src="/images/테스트주도개발시작하기.png" width="200" height="300" alt="테스트주도개발시작하기" />
            <Image src="/images/이코테.png" width="200" height="300" alt="이코테" />
            <Image src="/images/이펙티브자바.png" width="200" height="300" alt="이펙티브자바" />
            <Image src="/images/객체지향사실과오해.png" width="200" height="300" alt="객체지향사실과오해" />
          </S.DevBooksImages>
        </S.DevBooksBox>

        <Link href="https://github.com/Tojaeung">
          <S.GitHubImage src="https://ghchart.rshah.org/Tojaeung" alt="깃허브 커밋 그래프" />
        </Link>

        <Link href="https://solved.ac/tojaeung">
          <S.SolvedacImage src="http://mazassumnida.wtf/api/v2/generate_badge?boj=tojaeung" alt="깃허브 커밋 그래프" />
        </Link>
      </S.AboutBox>
      <HomeCategory categories={categories} />
    </S.Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { refreshToken } = ctx.req.cookies;
  if (refreshToken) axios.defaults.headers.Cookie = refreshToken;

  const categories = await getCategories();

  return { props: { categories } };
};

export default About;
