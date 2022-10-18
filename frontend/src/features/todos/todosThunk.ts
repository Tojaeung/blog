import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from 'apps/store';
import instance from 'apps/axios';
import type { TodoType } from './todosSlice';

// fetchTodos ////////////////////////////////////////////////////////////
interface fetchTodosReturnType {
  msg: string;
  todos: TodoType[];
}

export const fetchTodos = createAsyncThunk<
  fetchTodosReturnType,
  void,
  { state: RootState; rejectValue: { msg: string } }
>('todos/fetchTodos', async (data, thunkApi) => {
  try {
    const res = await instance.get('/todos');
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue(err.response.data);
  }
});

// createTodo ////////////////////////////////////////////////////////////
interface createTodoReturnType {
  msg: string;
  todo: TodoType;
}

interface createTodoParamType {
  name: string;
  completed: boolean;
}

export const createTodo = createAsyncThunk<
  createTodoReturnType,
  createTodoParamType,
  { state: RootState; rejectValue: { msg: string } }
>('todos/createTodos', async (data, thunkApi) => {
  try {
    const { name, completed } = data;
    const res = await instance.post('/todos', { name, completed });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue(err.response.data);
  }
});
