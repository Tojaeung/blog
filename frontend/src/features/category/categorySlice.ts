import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../apps/store';
import { createCategory, deleteCategory, getCategorys, updateCategory } from './categoryThunk';
import { CategoryState } from './type';

const initialState: CategoryState = {
  categorys: [],
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCategory.fulfilled, (state, { payload }) => {
        state.categorys.push(payload.categorys);
      })
      .addCase(createCategory.rejected, (state) => {
        state.categorys;
      });

    builder
      .addCase(getCategorys.fulfilled, (state, { payload }) => {
        state.categorys = payload.categorys;
      })
      .addCase(getCategorys.rejected, (state) => {
        state.categorys = [];
      });
    builder
      .addCase(updateCategory.fulfilled, (state, { payload }) => {
        const index = state.categorys.findIndex((category) => category.id === payload.updatedCategory.id);
        state.categorys.splice(index, 1, payload.updatedCategory);
      })
      .addCase(updateCategory.rejected, (state) => {
        state.categorys;
      });

    builder
      .addCase(deleteCategory.fulfilled, (state, { payload }) => {
        const index = state.categorys.findIndex((category) => category.id === payload.deletedId);
        state.categorys.splice(index, 1);
      })
      .addCase(deleteCategory.rejected, (state) => {
        state.categorys;
      });
  },
});

export const selectCategorys = (state: RootState) => state.category.categorys;
export const selectAllPostsCnt = (state: RootState): number => {
  let allPostsCnt = 0;
  state.category.categorys.map((category) => {
    allPostsCnt += category.postCnt;
  });

  return allPostsCnt;
};

export default categorySlice;
