import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import axios from 'axios';
const POSTS_URL = 'https://jsonplaceholder.typicode.com/users';
type user = {
  id: string;
  name: string;
};
const initialState: user[] = [];
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get(POSTS_URL);
  return response.data;
});
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(
      fetchUsers.fulfilled,
      (state, action: PayloadAction<user[]>) => {
        return action.payload;
      }
    );
  },
});

export const selectAllUsers = (state: RootState) => state.users;

export default usersSlice.reducer;
