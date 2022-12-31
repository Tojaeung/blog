import HomeCategory from 'components/HomeCategory';
import DevBooks from 'components/DevBooks';
import MetaTag from 'layouts/MetaTag';

import * as S from './style';

function About() {
  return (
    <>
      <MetaTag
        title='자기소개 - 토재웅'
        desc='안녕하세요 !! 백엔드 개발자 토재웅 입니다. 첫째도 기본!! 둘째도 기본!! 기본에 충실하자 !!'
        image='/images/profile.jpg'
        url='https://tojaeung.com/about'
      />

      <S.Container>
        <S.AboutBox>
          <S.Title>About Me</S.Title>
          <S.ProfileBox>
            <S.ProfileImage src='/images/cat.gif' alt='프로필사진' />

            <S.IntroBox>
              <S.IntroMySelf>
                백엔드 개발자 <S.MyName>토재웅</S.MyName>입니다!!
              </S.IntroMySelf>
              <S.IntroList>- Java, Typescript 언어 사용</S.IntroList>
              <S.IntroList>- Springboot, Node.js를 이용한 웹 서버 개발</S.IntroList>
              <S.IntroList>- RDBMS인 MySQL을 이용한 데이터베이스 구조 설계</S.IntroList>
              <S.IntroList>- JPA에 대한 이해와 사용</S.IntroList>
              <S.IntroList>- 알고리즘, 자료구조에 대한 이해와 활용</S.IntroList>
              <S.IntroList>- React를 이용한 SPA 클라이언트 앱 구축 및 기능 개발</S.IntroList>
              <S.IntroList>- Styled-components를 이용한 CSS-in-JS 개발</S.IntroList>
              <S.IntroList>- REST API 설계</S.IntroList>
              <S.IntroList>- PC, Mobile 반응형 웹 개발</S.IntroList>
              <S.IntroList>- AWS(S3, EC2, RDS) HTTPS 배포 및 서버 배포 자동화</S.IntroList>
            </S.IntroBox>
          </S.ProfileBox>

          <S.CV>
            ✅ 주어진 상황에서 최선을 다해 해결책을 찾으려고 노력하는 개발자 <br />
            ✅ 경험을 공유하고 함께 성장하는 가치를 가장 중시하는 개발자 <br />
            ✅ 새로운 지식과 기술을 배우는것을 좋아하는 개발자 <br />
            ✅ 나 혼자의 역량만이 아니라 함께하는 팀의 성장을 도울 수 있는 개발자 <br />
            ✅ 비즈니스 임팩트, 좋은 퍼포먼스, 읽기 쉽고 확장에 유연한 코드를 중시하는 개발자 <br />
            ✅ 하늘위에 하늘이 있다는것을 알고 매사 겸손한 개발자 기본을 중시하는 개발자 <br />
            ✅ 기획자, 디자이너에게 이해하기 쉽게 친절히 설명할 수 있는 개발자 <br />
            ✅ 1일 1커밋, 1일 1PS(problem solve), 1일 1포스팅 개발에 진심인 개발자 <br />
          </S.CV>

          <S.CertificateBox>
            <S.CertificateTitle>자격증</S.CertificateTitle>
            <S.CertificateImages>
              <S.CommonImage src='/images/sqld자격증.png' alt='sqld자격증' />
            </S.CertificateImages>
          </S.CertificateBox>

          <DevBooks />

          <a href='https://github.com/Tojaeung' target='_blank' rel='noreferrer'>
            <S.GitHubImage src='https://ghchart.rshah.org/Tojaeung' alt='깃허브 커밋 그래프' />
          </a>

          <a href='https://solved.ac/tojaeung' target='_blank' rel='noreferrer'>
            <S.SolvedacImage src='http://mazassumnida.wtf/api/v2/generate_badge?boj=tojaeung' alt='솔브닥티어' />
          </a>
        </S.AboutBox>
        <HomeCategory />
      </S.Container>
    </>
  );
}

export default About;
