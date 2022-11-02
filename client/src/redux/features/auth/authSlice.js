import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
  isLoading: false,
  status: null,
};

const setError = (state, { payload }) => {
  state.status = payload.data.message;
  state.isLoading = false;
};

const setUser = (state, { payload }) => {
  const { username, createdAt, updatedAt, token, message, _id: id } = payload;
  state.status = message;
  state.isLoading = false;
  state.user = { username, createdAt, updatedAt, id };
  state.token = token;
};

const setLoading = (state) => {
  state.status = null;
  state.isLoading = true;
};

export const getMe = createAsyncThunk('auth/getMe', async (_, { rejectWithValue, extra }) => {
  try {
    const response = await extra.api.get('/auth/me');

    if (!response.data) {
      throw new Error();
    }

    if (response.data.token) {
      window.localStorage.setItem('token', response.data.token);
    }

    return response.data;
  } catch (error) {
    console.log(error);
    return rejectWithValue(error.response);
  }
});

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (data, { rejectWithValue, extra }) => {
    if (!data.username || !data.password) {
      return rejectWithValue('error');
    }
    try {
      const response = await extra.api.post('/auth/register', data);

      if (!response.data) {
        throw new Error();
      }

      if (response.data.token) {
        window.localStorage.setItem('token', response.data.token);
      }

      extra.navigate('/');

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (data, { rejectWithValue, extra }) => {
    if (!data.username || !data.password) {
      return rejectWithValue('error');
    }

    try {
      const response = await extra.api.post('/auth/login', data);

      if (!response.data) {
        throw new Error();
      }

      if (response.data.token) {
        window.localStorage.setItem('token', response.data.token);
      }

      extra.navigate('/');

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // logout: () => initialState,
    logout: (state) => {
      Object.assign(state, initialState);
      window.localStorage.removeItem('token');
    },
  },
  extraReducers: {
    [registerUser.pending]: setLoading,
    [registerUser.fulfilled]: setUser,
    [registerUser.rejected]: setError,
    [getMe.pending]: setLoading,
    [getMe.fulfilled]: setUser,
    [getMe.rejected]: setError,
    [loginUser.pending]: setLoading,
    [loginUser.fulfilled]: setUser,
    [loginUser.rejected]: setError,
  },
});

export const checkIsAuth = (state) => Boolean(state.auth.token);

export const { actions: authActions, reducer: authReducer, name: auth } = authSlice;
