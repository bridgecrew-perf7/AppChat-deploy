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
      localStorage.removeItem(keyStorage);
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
      localStorage.removeItem(keyStorage);
    }
  }
);

const uploadSlice = createSlice({
  name: 'upload',
  initialState: {},
  reducers: {},
  extraReducers: {
    [uploadAvatar.fulfilled]: (state, action) => {},
    [uploadMedia.fulfilled]: (state, action) => {},
  },
});

const uploadReducer = uploadSlice.reducer;

export const {} = uploadSlice.actions;
export default uploadReducer;
