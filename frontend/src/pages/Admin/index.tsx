import { useNavigate } from 'react-router-dom';

import MetaTag from 'layouts/MetaTag';
import * as S from './style';

function Admin() {
  const navigate = useNavigate();

  return (
    <>
      <MetaTag
        title='관리페이지 - 토재웅'
        desc='안녕하세요 !! 백엔드 개발자 토재웅 입니다. 첫째도 기본!! 둘째도 기본!! 기본에 충실하자 !!'
        image='/images/profile.jpg'
        url='https://tojaeung.com/admin'
      />
      <S.Container>
        <S.GoCategory onClick={() => navigate('/admin/category')}>카테고리 수정 하러가기</S.GoCategory>
        <S.GoPost onClick={() => navigate('/admin/post')}>포스팅 하러가기</S.GoPost>
      </S.Container>
    </>
  );
}

export default Admin;
