import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

type user = {
  id: string;
  name: string;
};
const initialState: user[] = [
  { id: '0', name: 'Dude Lebowski' },
  { id: '1', name: 'Neil Young' },
  { id: '2', name: 'Sourav sinha' },
];

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
});

export const selectAllUsers = (state: RootState) => state.users;

export default usersSlice.reducer;
