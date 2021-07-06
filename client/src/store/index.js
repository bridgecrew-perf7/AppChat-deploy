import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userSlice';
import friendReducer from './reducers/friendSlice';
import uploadReducer from './reducers/uploadSlice';

const store = configureStore({
  reducer: {
    userReducer,
    friendReducer,
    uploadReducer,
  },
});

export default store;
