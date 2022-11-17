import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import React from 'react';

import { deletePost } from 'apis/post';

import TagBadges from 'components/TagBadges';

import * as S from './style';
import { IProps } from './type';

const Viewer = dynamic(() => import('components/EditorViewer'), { ssr: false });

function Posting({ auth, post }: IProps) {
  const router = useRouter();

  const handleDeletePosting = async () => {
    if (!auth?.accessToken) return;

    const confirm = prompt('정말로 삭제하시겠습니까?("삭제" 입력시, 실행된다.)', '');
    if (confirm === '삭제') {
      await deletePost(Number(router.query.id), auth?.accessToken);
      alert('삭제 되었습니다.');
      router.push('/');
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
            <S.CreateButton onClick={(e) => router.push('/admin/post')}>생성</S.CreateButton>
            <S.DeleteButton onClick={handleDeletePosting}>제거</S.DeleteButton>
          </S.AdminButtonBox>
        )}
      </S.Header>

      <Image src={post.thumbnail} width={700} height={500} layout="responsive" alt="포스팅 사진" priority={true} />

      <Viewer content={post.content || ''} />

      <S.Line />
      <S.Title>Tags</S.Title>
      {post.tags.length !== 0 && <TagBadges tags={post.tags} />}
    </S.Container>
  );
}

export default Posting;
