import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../redux/rootReducer';

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
