import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  posts: [],
  popularPosts: [],
  loading: false,
  error: null,
};

export const createPost = createAsyncThunk(
  'post/createPost',
  async (params, { rejectWithValue, extra }) => {
    if (!params) {
      return rejectWithValue('error');
    }

    try {
      const response = await extra.api.post('/posts', params);

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

export const getAllPosts = createAsyncThunk(
  'post/getAllPosts',
  async (_, { rejectWithValue, extra }) => {
    try {
      const response = await extra.api.get('/posts');

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

export const removePost = createAsyncThunk(
  'post/removePost',
  async (id, { rejectWithValue, extra }) => {
    if (!id) {
      return rejectWithValue('error');
    }

    try {
      const response = await extra.api.delete(`/posts/${id}`, id);

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

export const updatePost = createAsyncThunk(
  'post/updatePost',
  async (updatedPost, { rejectWithValue, extra }) => {
    if (!updatedPost) {
      return rejectWithValue('error');
    }
    try {
      const response = await extra.api.put(`/posts/${updatedPost.id}`, updatedPost);

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

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: {
    // Создание поста
    [createPost.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [createPost.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.posts.push(action.payload);
    },
    [createPost.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    // Получаение всех постов
    [getAllPosts.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getAllPosts.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.posts = action.payload.posts;
      state.popularPosts = action.payload.popularPosts;
    },
    [getAllPosts.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    // Удаление поста
    [removePost.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [removePost.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.posts = state.posts.filter((post) => post._id !== action.payload._id);
    },
    [removePost.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    // Обновление поста
    [updatePost.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [updatePost.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      const index = state.posts.findIndex((post) => post._id === action.payload._id);
      state.posts[index] = action.payload;
    },
    [updatePost.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const {
  actions: PostSliceActions,
  reducer: postSliceReducer,
  name: postSliceName,
} = postSlice;
