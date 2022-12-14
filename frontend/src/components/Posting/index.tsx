import { ChangeEvent, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import 'react-quill/dist/quill.core.css';
import 'highlight.js/styles/github.css';

import { getPost, deletePost } from 'apis/post';

import TagBadges from 'components/TagBadges';
import MetaTag from 'layouts/MetaTag';

import * as S from './style';
import { adminApi } from 'utils/axios';

function Posting() {
  const queryCache = useQueryClient();

  const accessToken = localStorage.getItem('accessToken');

  const navigate = useNavigate();
  const { postId } = useParams();

  const [updatedThumbnail, setUpdatedThumbnail] = useState<File>();

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

  // 업데이트 할 썸네일
  const onUpdatedThumbnail = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setUpdatedThumbnail(e.target.files[0]);
  };

  // 썸네일 업데이트
  const handleUpdateThumbnail = async () => {
    if (!accessToken) return;

    const confirm = prompt('썸네일을 변경하시겠습니까?("변경" 입력시, 실행된다.)', '');
    if (confirm === '변경') {
      try {
        const formData = new FormData();
        formData.append('updatedThumbnail', updatedThumbnail as File);
        await adminApi.put(`/post/${postId}/thumbnail`, formData);
        alert('썸네일이 변경되었습니다.');
      } catch (e: any) {
        alert(e.response.data.message);
      }
    } else alert('삭제 되지 않았습니다.');
  };

  return (
    <>
      <MetaTag
        title={post?.title || ''}
        desc={post?.content || ''}
        keywords={post?.tags}
        image={post?.thumbnail || ''}
        url={`https://tojaeung.com/post/${postId}`}
      />
      <S.Container>
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
              <S.UpdateButton onClick={() => navigate(`/admin/update/${post?.id}`)}>변경</S.UpdateButton>
              <S.DeleteButton onClick={handleDelete}>제거</S.DeleteButton>
            </S.AdminButtonBox>
          )}
        </S.Header>

        <S.ThumbnailBox>
          {accessToken && (
            <S.UpdateThumbnailBox>
              <S.ThumbnailInput type='file' accept='image/*' onChange={onUpdatedThumbnail} />
              <S.UpdateThumbnailButton onClick={handleUpdateThumbnail}>썸네일변경</S.UpdateThumbnailButton>
            </S.UpdateThumbnailBox>
          )}
          <S.thumbnailImage src={post?.thumbnail} alt='포스팅 사진' />
        </S.ThumbnailBox>

        {post?.content && (
          <S.Content className='ql-editor ql-syntax' dangerouslySetInnerHTML={{ __html: post?.content || '' }} />
        )}

        <S.Line />
        <S.Title>Tags</S.Title>
        {post?.tags.length !== 0 && <TagBadges tags={post?.tags} />}
      </S.Container>
    </>
  );
}

export default Posting;
