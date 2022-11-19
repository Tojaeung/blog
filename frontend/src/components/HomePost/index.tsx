import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import * as S from './style';
import { IProp } from './type';

const Viewer = dynamic(() => import('components/Editor/CardViewer'), { ssr: false });

function HomePost({ postsTop5 }: IProp) {
  return (
    <S.PostBox>
      {postsTop5?.map((post) => {
        return (
          <Link href={`/post/${post.id}`} key={post.id}>
            <S.PostList>
              <S.ImageBox>
                <Image
                  src={post.thumbnail}
                  width="200"
                  height="200"
                  layout="responsive"
                  alt="포스팅 썸네일"
                  priority={true}
                />
              </S.ImageBox>
              <S.TextBox>
                <S.Title>{post.title}</S.Title>

                <Viewer content={post.content} />

                <S.Detailed>
                  {post.createdAt} | 조회수 {post.views}
                </S.Detailed>
              </S.TextBox>
            </S.PostList>
          </Link>
        );
      })}
    </S.PostBox>
  );
}

export default HomePost;
