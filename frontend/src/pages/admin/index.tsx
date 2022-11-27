import { useNavigate } from 'react-router-dom';

import * as S from './style';

function Admin() {
  const navigate = useNavigate();

  return (
    <S.Container>
      <S.GoCategory onClick={() => navigate('/admin/category')}>카테고리 수정 하러가기</S.GoCategory>
      <S.GoPost onClick={() => navigate('/admin/post')}>포스팅 하러가기</S.GoPost>
    </S.Container>
  );
}

export default Admin;
