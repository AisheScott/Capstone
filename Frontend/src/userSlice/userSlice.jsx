import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    token: null,
    // other fields like username, email, etc.
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.token = null;
    },
  },
});

export const { setToken, logout } = userSlice.actions;
export const getToken = (state) => state.user.token;

export default userSlice.reducer;