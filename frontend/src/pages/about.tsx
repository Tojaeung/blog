import Image from 'next/image';
import Link from 'next/link';
import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import axios from 'axios';

import { getCategories } from 'apis/category';

import HomeCategory from 'components/HomeCategory';
import HeadMeta from 'layouts/HeadMeta';

interface IProp {
  categories: CategoryType[];
}

const About: NextPage<IProp> = ({ categories }) => {
  return (
    <Container>
      <HeadMeta
        title="About - 토재웅님의 블로그"
        description="안녕하세요!! 백엔드 개발자 토재웅입니다. 첫째도 기본!! 둘째도 기본!! 기본에 충실하자!!"
        image="/images/profile.jpg"
        url="https://tojaeung.com/about"
      />
      <AboutBox>
        <Title>About Me</Title>

        <ProfileBox>
          <Image src="/images/cat.gif" width="300" height="300" alt="프로필사진" />

          <IntroBox>
            <IntroMySelf>
              백엔드 개발자 <MyName>토재웅</MyName>입니다!!
            </IntroMySelf>
            <IntroList>- Java, Typescript 언어 사용</IntroList>
            <IntroList>- Springboot, Node.js를 이용한 웹 서버 개발</IntroList>
            <IntroList>- RDBMS인 MySQL을 이용한 데이터베이스 구조 설계</IntroList>
            <IntroList>- RESTful API 설계</IntroList>
            <IntroList>- JPA에 대한 이해와 사용경험</IntroList>
            <IntroList>- React를 이용한 SPA 클라이언트 앱 구축 및 기능 개발</IntroList>
            <IntroList>- Styled-components를 이용한 CSS-in-JS 개발</IntroList>
            <IntroList>- PC, Mobile 반응형 웹 개발</IntroList>
            <IntroList>- SEO최적화를 위한 SSR이해와 Next.js 프레임워크 개발</IntroList>
            <IntroList>- AWS(S3, EC2, RDS) HTTPS 배포 및 서버 배포 자동화</IntroList>
          </IntroBox>
        </ProfileBox>

        <CV>
          ✅ 주어진 상황에서 최선을 다해 최선의 해결책을 찾으려고 노력하는 개발자 <br />
          ✅ 경험을 공유하고 함께 성장하는 가치를 가장 중시하는 개발자 <br />
          ✅ 새로운 지식과 기술을 배우는것을 좋아하는 개발자 <br />
          ✅ 나 혼자의 역량만이 아니라 함께하는 팀의 성장을 도울 수 있는 개발자 <br />
          ✅ 비즈니스 임팩트, 좋은 퍼포먼스, 읽기 쉽고 확장에 유연한 코드를 중시하는 개발자 <br />
          ✅ 하늘위에 하늘이 있다는것을 알고 매사 겸손하며 기본에 충실한 개발자 <br />
          ✅ 기획자, 디자이너에게 이해하기 쉽게 친절히 설명할 수 있는 개발자 <br />
          ✅ 1일 1커밋, 1일 1PS(problem solve), 1일 1포스팅 개발에 진심인 개발자 <br />
        </CV>

        <CertificateBox>
          <CertificateTitle>자격증</CertificateTitle>
          <CertificateImages>
            <Image src="/images/sqld자격증.png" width="200" height="300" alt="sqld자격증" />
            <CertificatePlan>
              정보처리기사 <br />
              2023.1 도전예정
            </CertificatePlan>
          </CertificateImages>
        </CertificateBox>

        <DevBooksBox>
          <DevBooksTitle>개발서적</DevBooksTitle>
          <DevBooksImages>
            <Image src="/images/sql레벨업.png" width="200" height="300" alt="sql레벨업" />
            <Image src="/images/테스트주도개발시작하기.png" width="200" height="300" alt="테스트주도개발시작하기" />
            <Image src="/images/이코테.png" width="200" height="300" alt="이코테" />
            <Image src="/images/이펙티브자바.png" width="200" height="300" alt="이펙티브자바" />
            <Image src="/images/객체지향사실과오해.png" width="200" height="300" alt="객체지향사실과오해" />
          </DevBooksImages>
        </DevBooksBox>

        <Link href="https://github.com/Tojaeung">
          <GitHubImage src="https://ghchart.rshah.org/Tojaeung" alt="깃허브 커밋 그래프" />
        </Link>

        <Link href="https://solved.ac/tojaeung">
          <SolvedacImage src="http://mazassumnida.wtf/api/v2/generate_badge?boj=tojaeung" alt="깃허브 커밋 그래프" />
        </Link>
      </AboutBox>
      <HomeCategory categories={categories} />
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { refreshToken } = ctx.req.cookies;
  if (refreshToken) axios.defaults.headers.Cookie = refreshToken;

  const categories = await getCategories();

  return { props: { categories } };
};

import styled from 'styled-components';
import { CommonTextStyle, CommonTitleStyle } from 'styles/globalStyle';
import { CategoryType } from 'interfaces/category';

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 30px;
  margin-top: 30px;

  @media ${({ theme }) => theme.device.tablet} {
    flex-direction: column;
  }
`;
const AboutBox = styled.div`
  width: 85%;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media ${({ theme }) => theme.device.tablet} {
    width: 100%;
  }
`;

const Title = styled(CommonTitleStyle)``;

const ProfileBox = styled.div`
  display: flex;
  gap: 20px;

  @media ${({ theme }) => theme.device.tablet} {
    flex-direction: column;
  }
`;

const IntroBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const IntroMySelf = styled(CommonTextStyle)`
  font-size: 20px;
  font-weight: bold;
`;
const MyName = styled.span`
  color: purple;
  font-weight: bold;
`;
const IntroList = styled(CommonTextStyle)``;

const CV = styled(CommonTextStyle)`
  font-size: 18px;
  line-height: 40px;

  @media ${({ theme }) => theme.device.mobile} {
    font-size: 16px;
  }
`;

const CertificateBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CertificateTitle = styled(CommonTitleStyle)``;
const CertificateImages = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;

  @media ${({ theme }) => theme.device.tablet} {
    gap: 5px;
  }
`;
const CertificatePlan = styled.div`
  width: 200px;
  background-color: ${({ theme }) => theme.palette.white};
  border: 1px solid;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  text-align: center;
  color: ${({ theme }) => theme.palette.textColor};
`;

const DevBooksBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const DevBooksTitle = styled(CommonTitleStyle)``;
const DevBooksImages = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;

  @media ${({ theme }) => theme.device.tablet} {
    gap: 5px;
  }
`;

const GitHubImage = styled.img`
  cursor: pointer;
`;
const SolvedacImage = styled.img`
  width: 50%;
  height: 50%;
  cursor: pointer;
  @media ${({ theme }) => theme.device.mobile} {
    width: 100%;
    height: 100%;
  }
`;

export default About;
