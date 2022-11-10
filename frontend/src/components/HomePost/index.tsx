import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { PostBox, PostList, TextBox, ViewBox, Detailed, Title, ImageBox } from './style';
import { IProp } from './type';

const Viewer = dynamic(() => import('components/EditorViewer'), { ssr: false });

function HomePost({ postsTop5 }: IProp) {
  return (
    <PostBox>
      {postsTop5?.map((post) => {
        return (
          <Link href={`/post/${post.id}`} key={post.id}>
            <PostList>
              <ImageBox>
                <Image src={post.thumbnail} width="200" height="200" alt="포스팅 썸네일" priority={true} />
              </ImageBox>
              <TextBox>
                <Title>{post.title}</Title>
                <ViewBox>
                  <Viewer content={post.content} />
                </ViewBox>
                <Detailed>
                  {post.createdAt} | 조회수 {post.views}
                </Detailed>
              </TextBox>
            </PostList>
          </Link>
        );
      })}
    </PostBox>
  );
}

export default HomePost;
