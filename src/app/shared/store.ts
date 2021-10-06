import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import scoreBoardSlice from '../../features/score-board/scoreBoardSlice';

export const store = configureStore({
  reducer: {
    scoreBoard: scoreBoardSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
