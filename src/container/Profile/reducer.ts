import {createSlice} from '@reduxjs/toolkit';

export interface ProfileState {
  isLoading: boolean;
}

const initialState: ProfileState = {
  isLoading: true,
};

export const ProfileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    isFetching: state => {
      state.isLoading = true;
    },
    getProfile: state => {
      state.isLoading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {isFetching, getProfile} = ProfileSlice.actions;

export default ProfileSlice.reducer;
