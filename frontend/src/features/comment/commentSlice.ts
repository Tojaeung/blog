import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from 'apps/store';
import { createComment, deleteComment, getComments } from './commentThunk';
import { CommentState } from './type';

const initialState: CommentState = {
  comments: [],
};

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createComment.fulfilled, (state, { payload }) => {
        state.comments.push(payload);
      })
      .addCase(createComment.rejected, (state) => {
        state.comments;
      });

    builder
      .addCase(getComments.fulfilled, (state, { payload }) => {
        state.comments = payload;
      })
      .addCase(getComments.rejected, (state) => {
        state.comments = [];
      });

    builder
      .addCase(deleteComment.fulfilled, (state, { payload }) => {
        const index = state.comments.findIndex((comment) => comment.id === payload);
        state.comments.splice(index, 1);
      })
      .addCase(deleteComment.rejected, (state) => {
        state.comments;
      });
  },
});

export const selectComments = (state: RootState) => state.comment.comments;

export default commentSlice;
