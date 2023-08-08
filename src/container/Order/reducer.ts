import {createSlice} from '@reduxjs/toolkit';

export interface orderState {
  isLoading: boolean;
}

const initialState: orderState = {
  isLoading: true,
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    isFetching: state => {
      state.isLoading = true;
    },
    getListSuccess: state => {
      state.isLoading = false;
    },
  },
});

export const {isFetching, getListSuccess} = orderSlice.actions;

export default orderSlice.reducer;
