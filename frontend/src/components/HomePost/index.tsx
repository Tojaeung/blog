import Image from 'next/image';
import Link from 'next/link';
import { PostBox, PostList, TextBox, Content, Detailed, Title, ImageBox } from './style';
import { IProp } from './type';

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
                <Content>{post.content}</Content>
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
