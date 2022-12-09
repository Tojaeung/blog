import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import 'react-quill/dist/quill.core.css';
import 'highlight.js/styles/github.css';

import { getPost, deletePost } from 'apis/post';

import TagBadges from 'components/TagBadges';
import MetaTag from 'layouts/MetaTag';

import * as S from './style';

function Posting() {
  const queryCache = useQueryClient();

  const accessToken = localStorage.getItem('accessToken');

  const navigate = useNavigate();
  const { postId } = useParams();

  const { data: post } = useQuery(['post', postId], () => getPost(Number(postId)));
  const { mutate: deletePostMutate } = useMutation(deletePost, {
    onSuccess: (deletedId) => {
      queryCache.invalidateQueries({ queryKey: ['post', deletedId] });
    },
  });

  const handleDelete = async () => {
    if (!accessToken) return;

    const confirm = prompt('정말로 삭제하시겠습니까?("삭제" 입력시, 실행된다.)', '');
    if (confirm === '삭제') {
      deletePostMutate(Number(postId));
      alert('삭제 되었습니다.');
      navigate('/');
    } else alert('삭제 되지 않았습니다.');
  };

  return (
    <S.Container>
      <MetaTag
        title={post?.title || ''}
        desc={post?.content || ''}
        keywords={post?.tags}
        image={post?.thumbnail || ''}
        url={`https://tojaeung.com/post/${postId}`}
      />
      <S.Header>
        <S.TitleBox>
          <S.Title>{post?.title}</S.Title>
          <S.Detail>
            {post?.categoryName} | {post?.createdAt} | 조회수 {post?.views}
          </S.Detail>
        </S.TitleBox>

        {accessToken && (
          <S.AdminButtonBox>
            <S.CreateButton onClick={() => navigate('/admin/post')}>생성</S.CreateButton>
            <S.DeleteButton onClick={handleDelete}>제거</S.DeleteButton>
          </S.AdminButtonBox>
        )}
      </S.Header>

      <S.thumbnailImage src={post?.thumbnail} alt='포스팅 사진' />

      {post?.content && (
        <S.Content className='ql-editor ql-syntax' dangerouslySetInnerHTML={{ __html: post?.content || '' }} />
      )}

      <S.Line />
      <S.Title>Tags</S.Title>
      {post?.tags.length !== 0 && <TagBadges tags={post?.tags} />}
    </S.Container>
  );
}

export default Posting;
