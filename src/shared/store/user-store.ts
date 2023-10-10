import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { AuthenticatedUser } from '../models/user';

export interface UserStore {
  user?: AuthenticatedUser;
  isLoading: boolean;
}

const initialState: UserStore = {
  isLoading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<AuthenticatedUser>) {
      state.user = action.payload;
    },
    setPassword(state, action: PayloadAction<string>) {
      state.user!.password = action.payload;
    },
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    reset(state) {
      state = initialState;
    },
  },
});

export default userSlice.reducer;
export const { setUser, setPassword, setIsLoading, reset } = userSlice.actions;
