import React from 'react';
import axios from 'axios';
import { GetServerSideProps, NextPage } from 'next';

import { getRefresh } from 'apis/auth';
import { getCategories } from 'apis/category';
import { getPost } from 'apis/post';
import { getComments } from 'apis/comment';

import BlogCategory from 'components/BlogCategory';
import Posting from 'components/Posting';
import Comment from 'components/Comment';

import HeadMeta from 'layouts/HeadMeta';
import { AuthType } from 'interfaces/auth';
import { CategoryType } from 'interfaces/category';
import { CommentType } from 'interfaces/comment';
import { PostType } from 'interfaces/post';

interface IProps {
  auth: AuthType | null;
  categories: CategoryType[];
  post: PostType;
  comments: CommentType[];
}

const Post: NextPage<IProps> = ({ auth, categories, post, comments }) => {
  return (
    <Container>
      <HeadMeta
        title={`${post.title} - 토재웅`}
        description={post.content}
        image={post.thumbnail}
        url={`https://tojaeung.com/post/${post.id}`}
      />
      <BlogCategory categories={categories} />
      <Posting auth={auth} post={post} />
      <Comment auth={auth} comments={comments} />
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { refreshToken } = ctx.req.cookies;

  let auth = null;
  if (refreshToken) {
    axios.defaults.headers.Cookie = refreshToken;
    auth = await getRefresh();
  }

  const categories = await getCategories();

  let post;
  try {
    post = await getPost(Number(ctx.query.id));
  } catch (e) {
    return {
      redirect: {
        permanent: false,
        destination: '/404',
      },
    };
  }

  const comments = await getComments(Number(ctx.query.id));

  return { props: { auth, categories, post, comments } };
};

import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin-top: 30px;
`;

export default Post;
