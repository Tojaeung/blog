import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from 'apps/store';
import { createPost, deletePost, getAllPosts, getPostsTop5, getPostsInCategory, updatePost } from './postThunk';
import { PostState } from './type';

const initialState: PostState = {
  posts: [],
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPost.fulfilled, (state, { payload }) => {
        state.posts.push(payload.post);
      })
      .addCase(createPost.rejected, (state) => {
        state.posts;
      });

    builder
      .addCase(getPostsTop5.fulfilled, (state, { payload }) => {
        state.posts = payload.posts;
      })
      .addCase(getPostsTop5.rejected, (state) => {
        state.posts = [];
      });

    builder
      .addCase(getAllPosts.fulfilled, (state, { payload }) => {
        state.posts = payload.posts;
      })
      .addCase(getAllPosts.rejected, (state) => {
        state.posts = [];
      });

    builder
      .addCase(getPostsInCategory.fulfilled, (state, { payload }) => {
        state.posts = payload.posts;
      })
      .addCase(getPostsInCategory.rejected, (state) => {
        state.posts = [];
      });

    builder
      .addCase(updatePost.fulfilled, (state, { payload }) => {
        const index = state.posts.findIndex((post) => post.id === payload.updatedPost.id);
        state.posts.splice(index, 1, payload.updatedPost);
      })
      .addCase(updatePost.rejected, (state) => {
        state.posts;
      });

    builder
      .addCase(deletePost.fulfilled, (state, { payload }) => {
        const index = state.posts.findIndex((post) => post.id === payload.deletedId);
        state.posts.splice(index, 1);
      })
      .addCase(deletePost.rejected, (state) => {
        state.posts;
      });
  },
});

export const selectPosts = (state: RootState) => state.post.posts;

export default postSlice;
