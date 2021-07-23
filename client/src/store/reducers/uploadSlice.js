import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instanceAxios, { setAuthToken } from '../../config/axios';

const keyStorage = 'accessToken';
export const uploadAvatar = createAsyncThunk(
  'upload/avatar',
  async (formData) => {
    if (localStorage[keyStorage]) {
      setAuthToken(localStorage[keyStorage]);
    }
    try {
      const res = await instanceAxios.post('/upload/avatar', formData);
      return res.data;
    } catch (error) {
      if (error) throw error;
    }
  }
);

export const uploadMedia = createAsyncThunk(
  'upload/media',
  async (formData) => {
    if (localStorage[keyStorage]) {
      setAuthToken(localStorage[keyStorage]);
    }
    try {
      const res = await instanceAxios.post('/upload/media', formData);
      return res.data;
    } catch (error) {
      if (error) throw error;
    }
  }
);

const uploadSlice = createSlice({
  name: 'upload',
  initialState: {},
  reducers: {},
  extraReducers: {
    [uploadAvatar.fulfilled]: (state, action) => {
      if (!action.payload.success) return localStorage.removeItem(keyStorage);
    },
    [uploadMedia.fulfilled]: (state, action) => {
      if (!action.payload.success) return localStorage.removeItem(keyStorage);
    },
  },
});

const uploadReducer = uploadSlice.reducer;

export const {} = uploadSlice.actions;
export default uploadReducer;
