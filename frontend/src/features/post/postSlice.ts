import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from 'apps/store';
import { createPost, deletePost, getPostsTop5, updatePost, getAllPosts } from './postThunk';
import { PostState, PostType } from './type';

const initialState: PostState = {
  posts: [],
  selectedPost: null,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    getPost: (state, { payload }) => {
      state.selectedPost = payload.post;
    },
    getPostsInCategory: (state, { payload }) => {
      state.posts = payload.posts;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPost.fulfilled, (state, { payload }) => {
        state.posts.push(payload);
      })
      .addCase(createPost.rejected, (state) => {
        state.posts;
      });

    builder
      .addCase(getAllPosts.fulfilled, (state, { payload }) => {
        state.posts = payload;
      })
      .addCase(getAllPosts.rejected, (state) => {
        state.posts = [];
      });

    builder
      .addCase(getPostsTop5.fulfilled, (state, { payload }) => {
        state.posts = payload;
      })
      .addCase(getPostsTop5.rejected, (state) => {
        state.posts = [];
      });

    // builder
    //   .addCase(getPost.fulfilled, (state, { payload }) => {
    //     state.selectedPost = payload;
    //   })
    //   .addCase(getPost.rejected, (state) => {
    //     state.selectedPost = null;
    //   });

    // builder
    //   .addCase(getPostsInCategory.fulfilled, (state, { payload }) => {
    //     state.posts = payload;
    //   })
    //   .addCase(getPostsInCategory.rejected, (state) => {
    //     state.posts = [];
    //   });

    builder
      .addCase(updatePost.fulfilled, (state, { payload }) => {
        const index = state.posts.findIndex((post: PostType) => post.id === payload.id);
        state.posts.splice(index, 1, payload);
      })
      .addCase(updatePost.rejected, (state) => {
        state.posts;
      });

    builder
      .addCase(deletePost.fulfilled, (state, { payload }) => {
        const index = state.posts.findIndex((post: PostType) => post.id === payload);
        state.posts.splice(index, 1);
      })
      .addCase(deletePost.rejected, (state) => {
        state.posts;
      });
  },
});

export const { getPost, getPostsInCategory } = postSlice.actions;

export const selectPosts = (state: RootState) => state.post.posts;
export const selectPost = (state: RootState) => state.post.selectedPost;

export default postSlice;
