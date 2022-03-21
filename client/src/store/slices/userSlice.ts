import {createSlice} from '@reduxjs/toolkit';

interface IInitialState {
  email: null;
  token: string | null;
  username: string | null;
  id: null;
}

const initialState: IInitialState = {
  email: null,
  username: null,
  token: null,
  id: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
      state.username = action.payload.username;
    },
    removeUser(state) {
      state.email = null;
      state.token = null;
      state.id = null;
      state.username = null;
    },
  },
});

export const {setUser, removeUser} = userSlice.actions;

export default userSlice.reducer;
