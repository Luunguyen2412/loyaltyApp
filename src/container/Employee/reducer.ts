import {createSlice} from '@reduxjs/toolkit';

export interface EmployeeState {
  isLoading: boolean;
}

const initialState: EmployeeState = {
  isLoading: true,
};

export const EmployeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    isFetching: state => {
      state.isLoading = true;
    },
    getListSuccess: state => {
      state.isLoading = false;
    },
    getUserSuccess: state => {
      state.isLoading = false;
    },
    updateUserSuccess: state => {
      state.isLoading = false;
    },
    addEmployee: state => {
      state.isLoading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  isFetching,
  addEmployee,
  getListSuccess,
  getUserSuccess,
  updateUserSuccess,
} = EmployeeSlice.actions;

export default EmployeeSlice.reducer;
