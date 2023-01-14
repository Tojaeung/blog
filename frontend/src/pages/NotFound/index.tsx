import { Helmet } from 'react-helmet-async';
import * as S from './style';

function NotFound() {
  return (
    <>
      <Helmet>
        <title>404 error - 토재웅</title>
      </Helmet>
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
