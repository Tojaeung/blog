import React from 'react';
import axios from 'axios';
import { GetServerSideProps, NextPage } from 'next';

import { getRefresh } from 'apis/auth';
import { getCategories } from 'apis/category';
import { getPost } from 'apis/post';

import BlogCategory from 'components/BlogCategory';
import Posting from 'components/Posting';
import Comment from 'components/Comment';

import { Container } from './style';
import { IProps } from './type';
import { getComments } from 'apis/comment';
import HeadMeta from 'layouts/HeadMeta';

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
  if (refreshToken) axios.defaults.headers.Cookie = refreshToken;

  const auth = await getRefresh();
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

export default Post;
