import {createSlice} from '@reduxjs/toolkit';

export interface LoginState {
  isLogin: boolean;
}

const initialState: LoginState = {
  isLogin: false,
};

export const LoginSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    goToMain: state => {
      state.isLogin = true;
    },
    logOut: state => {
      state.isLogin = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {goToMain, logOut} = LoginSlice.actions;

export default LoginSlice.reducer;
