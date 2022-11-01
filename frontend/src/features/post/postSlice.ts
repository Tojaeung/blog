import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from 'apps/store';
import { createPost, deletePost, getPosts, updatePost } from './postThunk';
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
      .addCase(getPosts.fulfilled, (state, { payload }) => {
        state.posts = payload.posts;
      })
      .addCase(getPosts.rejected, (state) => {
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
