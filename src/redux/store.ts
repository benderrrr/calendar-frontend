import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from './reducers/counter/counterSlice';
import genericReducer from './reducers/calendar/calendarSlice';
import modalsReducer from './reducers/modals/modalsSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    generic: genericReducer,
    modals: modalsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
