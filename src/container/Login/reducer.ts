import {createSlice} from '@reduxjs/toolkit';

export interface LoginState {
  isLogin: boolean;
  isLoading: boolean;
  isError: boolean;
}

const initialState: LoginState = {
  isLogin: false,
  isLoading: false,
  isError: false,
};

export const LoginSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    isFetching: state => {
      state.isLogin = false;
      state.isLoading = true;
      state.isError = false;
    },
    isLogInFail: state => {
      state.isLogin = false;
      state.isLoading = false;
      state.isError = true;
    },
    goToMain: state => {
      state.isLogin = true;
      state.isLoading = false;
      state.isError = false;
    },
    logOut: state => {
      state.isLogin = false;
      state.isLoading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {isFetching, goToMain, logOut, isLogInFail} = LoginSlice.actions;

export default LoginSlice.reducer;
