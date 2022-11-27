import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import 'highlight.js/styles/github.css';

import { AuthContext } from 'contexts/Auth';

import usePostQuery from 'hooks/usePostQuery';

import TagBadges from 'components/TagBadges';

import * as S from './style';
import { IAuthContext } from 'contexts/Auth/type';

function Posting() {
  const { auth } = useContext(AuthContext) as IAuthContext;

  const navigate = useNavigate();
  const { postId } = useParams();

  const { fetchPostQuery, deletePostMutation } = usePostQuery();

  const { data: post } = fetchPostQuery(Number(postId));

  const handleDelete = async (postId: number) => {
    if (!auth?.accessToken) return;

    const confirm = prompt('정말로 삭제하시겠습니까?("삭제" 입력시, 실행된다.)', '');
    if (confirm === '삭제') {
      deletePostMutation.mutate(postId);
      alert('삭제 되었습니다.');
      navigate('/');
    } else alert('삭제 되지 않았습니다.');
  };

  return (
    <S.Container>
      <S.Header>
        <S.TitleBox>
          <S.Title>{post.title}</S.Title>
          <S.Detail>
            {post.categoryName} | {post.createdAt} | 조회수 {post?.views}
          </S.Detail>
        </S.TitleBox>

        {auth?.accessToken && (
          <S.AdminButtonBox>
            <S.CreateButton onClick={() => navigate('/admin/post')}>생성</S.CreateButton>
            <S.DeleteButton onClick={() => handleDelete(post.id)}>제거</S.DeleteButton>
          </S.AdminButtonBox>
        )}
      </S.Header>

      <img src={post.thumbnail} alt='포스팅 사진' />

      {post.content && <S.Content dangerouslySetInnerHTML={{ __html: post.content || '' }} />}

      <S.Line />
      <S.Title>Tags</S.Title>
      {post.tags.length !== 0 && <TagBadges tags={post.tags} />}
    </S.Container>
  );
}

export default Posting;
