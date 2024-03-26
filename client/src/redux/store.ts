import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './userReducer';
import gameReducer from './gameReducer';
import questionReducer from './questionReducer';

const rootReducer = combineReducers({
  userReducer,
  gameReducer,
  questionReducer,
});

const store = configureStore({
  reducer: rootReducer,
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;