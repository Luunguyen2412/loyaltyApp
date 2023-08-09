import {createSlice} from '@reduxjs/toolkit';

export interface ProfileState {
  isLoading: boolean;
  dataUser: {};
}

const initialState: ProfileState = {
  isLoading: true,
  dataUser: {},
};

export const ProfileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    isFetching: state => {
      state.isLoading = true;
    },
    getProfile: (state, action) => {
      state.isLoading = false;
      state.dataUser = action.payload;
    },
    getProfileFail: state => {
      state.isLoading = false;
      state.dataUser = {};
    },
  },
});

// Action creators are generated for each case reducer function
export const {isFetching, getProfile, getProfileFail} = ProfileSlice.actions;

export default ProfileSlice.reducer;
