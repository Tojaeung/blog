import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { updatePost, getPost } from 'apis/post';

import QuillEditor from 'components/QuillEditor';
import MetaTag from 'layouts/MetaTag';

import * as S from './style';
import NotFound from 'pages/NotFound';

function Update() {
  const queryCache = useQueryClient();

  const navigate = useNavigate();
  const { postId } = useParams();

  const { data: post, isError } = useQuery(['post', postId], () => getPost(Number(postId)), {
    onSuccess: (post) => {
      setUpdatedTitle(post.title);
      setUpdatedContent(post.content);
    },
  });
  const { mutate: updatePostMutate } = useMutation(updatePost, {
    onSuccess: () => {
      queryCache.invalidateQueries({ queryKey: ['post', postId] });
    },
    onError: (e: any) => {
      alert(e.response.data.message);
    },
  });

  const [updatedTitle, setUpdatedTitle] = useState(post?.title || '');
  const [updatedContent, setUpdatedContent] = useState(post?.content || '');

  const handleSubmit = async () => {
    try {
      updatePostMutate({ postId: Number(postId), updatedTitle, updatedContent });
      alert('포스팅 수정 되었습니다.');
      navigate(`/post/${postId}`);
    } catch (e: any) {
      alert(e.response.data.message);
    }
  };

  if (isError) return <NotFound />;
  return (
    <>
      <MetaTag
        title='포스팅 변경 - 토재웅'
        desc='안녕하세요 !! 백엔드 개발자 토재웅 입니다. 첫째도 기본!! 둘째도 기본!! 기본에 충실하자 !!'
        url={`https://tojaeung.com/admin/update/${postId}`}
      />
      <S.Container>
        <S.TitleInput
          placeholder='포스팅 제목'
          value={updatedTitle}
          onChange={(e) => setUpdatedTitle(e.target.value)}
        />

        <QuillEditor content={updatedContent} setContent={setUpdatedContent} />

        <S.SubmitButton onClick={handleSubmit}>변경하기</S.SubmitButton>
      </S.Container>
    </>
  );
}

export default Update;
