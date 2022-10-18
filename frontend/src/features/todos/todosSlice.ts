import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from 'apps/store';
import { createTodo, fetchTodos } from './todosThunk';

export type TodoType = {
  id: number;
  name: string;
  completed: boolean;
};

export type TodoState = {
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  msg: string;
  todos: TodoType[];
};

const initialState: TodoState = {
  loading: 'idle',
  msg: '',
  todos: [],
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state, action) => {
        state.loading = 'pending';
      })
      .addCase(fetchTodos.fulfilled, (state, { payload }) => {
        state.loading = 'succeeded';
        state.msg = payload.msg;
        state.todos = payload.todos;
      })
      .addCase(fetchTodos.rejected, (state, { payload }) => {
        state.loading = 'failed';
        state.msg = payload!.msg;
      });

    builder
      .addCase(createTodo.pending, (state, action) => {
        state.loading = 'pending';
      })
      .addCase(createTodo.fulfilled, (state, { payload }) => {
        state.loading = 'succeeded';
        state.msg = payload.msg;
        state.todos.push(payload.todo);
      })
      .addCase(createTodo.rejected, (state, { payload }) => {
        state.loading = 'failed';
        state.msg = payload!.msg;
      });
  },
});

export const selectTodosLoading = (state: RootState) => state.todos.loading;
export const selectTodosMsg = (state: RootState) => state.todos.msg;
export const selectTodos = (state: RootState) => state.todos.todos;

export default todosSlice;
