import * as S from './style';

function DevBooks() {
  return (
    <S.Container>
      <S.Title>개발서적</S.Title>
      <S.DevBooksBox>
        <S.Image src='/images/sql레벨업.png' alt='sql레벨업' />
        <S.Image src='/images/테스트주도개발시작하기.png' alt='테스트주도개발시작하기' />
        <S.Image src='/images/이코테.png' alt='이코테' />
        <S.Image src='/images/이펙티브자바.png' alt='이펙티브자바' />
        <S.Image src='/images/객체지향사실과오해.png' alt='객체지향사실과오해' />
        <S.Image src='/images/http.jpg' alt='http' />
        <S.Image src='/images/디자인패턴.png' alt='디자인패턴' />
        <S.Image src='/images/스프링입문을.png' alt='스프링입문을' />
        <S.Image src='/images/운영체제.png' alt='운영체제' />
      </S.DevBooksBox>
    </S.Container>
  );
}

export default DevBooks;
