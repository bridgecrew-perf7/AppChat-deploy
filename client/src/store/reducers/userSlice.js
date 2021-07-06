import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import instanceAxios, { setAuthToken } from '../../config/axios';

export const registerUser = createAsyncThunk(
  'user/register',
  async (newUser) => {
    const res = await instanceAxios.post('/user/register', newUser);
    return res.data;
  }
);

const keyStorage = 'accessToken';
export const loginUser = createAsyncThunk('user/login', async (user) => {
  const res = await instanceAxios.post('/user/login', user);
  if (res.data.success) {
    await localStorage.setItem(keyStorage, res.data.data); // chứa token
  }
  return res.data;
});

export const getUser = createAsyncThunk('user/get-user', async () => {
  if (localStorage[keyStorage]) {
    setAuthToken(localStorage[keyStorage]);
  }
  try {
    const res = await instanceAxios.get('/user/get-user');
    if (!res.data.success) {
      localStorage.removeItem(keyStorage);
    }
    return res.data;
  } catch (error) {
    localStorage.removeItem(keyStorage);
    setAuthToken(null);
    useDispatch(
      setAuth({ user: null, isAuthenticated: false, authLoading: true })
    );
  }
});

export const forgotPassword = createAsyncThunk(
  'user/forgot-password',
  async (user) => {
    const res = await instanceAxios.post('/user/forgot-password', user);
    return res.data;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    isAuthenticated: false,
    authLoading: true,
  },
  reducers: {
    setAuth(state, action) {
      state.user = action.payload.user;
      state.isAuthenticated = action.payload.isAuthenticated;
      state.authLoading = action.payload.authLoading;
    },
  },
  extraReducers: {
    
    [registerUser.fulfilled]: (state, action) => {},
    
    [loginUser.fulfilled]: (state, action) => {},
  
    [getUser.fulfilled]: (state, action) => {
      if (action.payload.success) {
        state.user = action.payload.data;
        state.isAuthenticated = true;
        state.authLoading = false;
      } else {
        state.user = null;
        state.isAuthenticated = false;
        state.authLoading = true;
      }
    },

    [forgotPassword.fulfilled]: (state, action) => {},
  },
});

const userReducer = userSlice.reducer;

export const { setAuth } = userSlice.actions;

export default userReducer;