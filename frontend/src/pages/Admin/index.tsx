import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import * as S from './style';

function Admin() {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>관리페이지 - 토재웅</title>
      </Helmet>
      <S.Container>
        <S.Title>관리자 페이지</S.Title>
        <S.ButtonBox>
          <S.LinkButton onClick={() => navigate('/admin/category')}>카테고리</S.LinkButton>
          <S.LinkButton onClick={() => navigate('/admin/post')}>포스팅</S.LinkButton>
        </S.ButtonBox>
      </S.Container>
    </>
  );
}

export default Admin;
