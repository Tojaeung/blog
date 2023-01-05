import MetaTag from 'layouts/MetaTag';
import * as S from './style';

function NotFound() {
  return (
    <>
      <MetaTag
        title='404페이지 - 토재웅'
        desc='안녕하세요 !! 백엔드 개발자 토재웅 입니다. 첫째도 기본!! 둘째도 기본!! 기본에 충실하자 !!'
        url='https://tojaeung.com/notfound'
      />

      <S.Container>
        <S.NotFoundImage src='/images/notFound.png' alt='404페이지 이미지' />
        <S.MessageBox>
          <S.ErrorCode>404</S.ErrorCode>
          <S.Message>
            This is not <br /> the web page <br /> you are looking for.
          </S.Message>
        </S.MessageBox>
      </S.Container>
    </>
  );
}

export default NotFound;
