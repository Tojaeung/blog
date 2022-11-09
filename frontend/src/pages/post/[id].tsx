import React from 'react';
import axios from 'axios';
import { GetServerSideProps, NextPage } from 'next';

import { getRefresh } from 'apis/auth';
import { getCategories } from 'apis/category';
import { getPost } from 'apis/post';

import BlogCategory from 'components/BlogCategory';
import Posting from 'components/Posting';

import { Container } from './style';
import { IProps } from './type';

const Post: NextPage<IProps> = ({ auth, categories, post }) => {
  return (
    <Container>
      <BlogCategory categories={categories} />
      <Posting auth={auth} post={post} />
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

  return { props: { auth, categories, post } };
};

export default Post;
