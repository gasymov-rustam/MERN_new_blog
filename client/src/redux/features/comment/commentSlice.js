import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  comments: [],
  loading: false,
  error: null,
};

export const createComment = createAsyncThunk(
  'comment/createComment',
  async (data, { rejectWithValue, extra }) => {
    if (!data.postId || !data.comment) {
      return rejectWithValue('error');
    }

    try {
      const response = await extra.api.post(`/comments/${data.postId}`, data);

      if (!response.data) {
        throw new Error();
      }

      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue('error');
    }
  }
);

export const getPostComments = createAsyncThunk(
  'comment/getPostComments',
  async (postId, { rejectWithValue, extra }) => {
    if (!postId) {
      return rejectWithValue('error');
    }

    try {
      const response = await extra.api.get(`/posts/comments/${postId}`);

      if (!response.data) {
        throw new Error();
      }

      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue('error');
    }
  }
);

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {},
  extraReducers: {
    // Создание поста
    [createComment.pending]: (state) => {
      state.loading = true;
    },
    [createComment.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.comments.push(payload);
    },
    [createComment.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    // Получение комментов
    [getPostComments.pending]: (state) => {
      state.loading = true;
    },
    [getPostComments.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.comments = payload;
    },
    [getPostComments.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const {
  actions: commentSliceActions,
  reducer: commentSliceReducer,
  name: commentSliceName,
} = commentSlice;
