import React from 'react';
import axios from 'axios';

import { getRefresh } from 'apis/auth';
import { getCategories } from 'apis/category';
import { getPost } from 'apis/post';
import { getComments } from 'apis/comment';

import BlogCategory from 'components/BlogCategory';
import Posting from 'components/Posting';
import Comment from 'components/Comment';

import { AuthType } from 'interfaces/auth';
import { CategoryType } from 'interfaces/category';
import { CommentType } from 'interfaces/comment';
import { PostType } from 'interfaces/post';

import * as S from './style';

function Post() {
  return (
    <S.Container>
      <BlogCategory categories={categories} />
      <Posting auth={auth} post={post} />
      <Comment auth={auth} comments={comments} />
    </S.Container>
  );
}

export default Post;
