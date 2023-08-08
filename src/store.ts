import {configureStore} from '@reduxjs/toolkit';
import LoginReducer from './container/Login/reducer';
import EmployeeSlice from './container/Employee/reducer';
import ProfileSlice from './container/Profile/reducer';
import orderSlice from './container/Order/reducer';

export const store = configureStore({
  reducer: {
    auth: LoginReducer,
    employee: EmployeeSlice,
    profile: ProfileSlice,
    order: orderSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
