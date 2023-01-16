import * as S from './style';

function Intro() {
  return (
    <S.Container>
      <S.BlogName>Tojaeung`s Blog👨‍💻</S.BlogName>
      <S.Content>기본없이 시작 할 수는 있지만 오래 갈 수는 없다..</S.Content>
      <S.Banner src='/images/banner.jpg' alt='프로필사진' />
    </S.Container>
  );
}

export default Intro;
