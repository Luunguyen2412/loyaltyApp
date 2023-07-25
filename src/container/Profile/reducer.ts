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
  },
});

// Action creators are generated for each case reducer function
export const {isFetching, getProfile} = ProfileSlice.actions;

export default ProfileSlice.reducer;
