import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppThunk, RootState} from '../../store';
import {IDay, IEventData, IIventsStorage} from "../../../components/monthView/interfaces";
import {fetchEvents, saveEvent, fetchDeleteEvent} from "./calendarAPI";
import {getDateKeyFromEvent} from "../../../utils/generic";
import {closeModal} from "../modals/modalsSlice";

export interface GenericState {
  currentMonthDate: Date | null;
  currentMonth: number;
  currentYear: number;
  days: IDay[];
  events: IIventsStorage;
}

const initialState: GenericState = {
  currentMonthDate: null,
  days: [],
  currentMonth: NaN,
  currentYear: NaN,
  events: {}
}

/*export const getBackGroundImage = createAsyncThunk(
  'calendar/fetchBackgroundImage',
  async (color: string) => {
    const response = await fetchBackgroundImage(color);
    return response.uri;
  }
);*/

export const calendarSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    changeCurrentMonth: (state, action: PayloadAction<{ date: Date, days: IDay[] }>) => {
      state.currentMonthDate = action.payload.date
      state.currentMonth = action.payload.date.getMonth()
      state.currentYear = action.payload.date.getFullYear()
      state.days = action.payload.days
    }
  },
  extraReducers: (builder) => {
    builder
      // .addCase(createEvent.pending, (state) => {
      //   state.backgroundImageStatus = statuses.LOADING
      // })
      .addCase(createEvent.fulfilled, (state, action) => {
        const dateKey = getDateKeyFromEvent(action.payload)
        if (action.payload.id) {
          state.events[dateKey] = {...state.events[dateKey], [action.payload.id]: action.payload}
        }
      })
      .addCase(getEvents.fulfilled, (state, action) => {
        if (Object.keys(action.payload).length) {
          state.events = action.payload
        }
      })
      .addCase(deleteEvent.fulfilled, (state, action: PayloadAction<{ id: string, dateKey: string }>) => {
        const newEvents = {...state.events}
        delete newEvents[action.payload.dateKey][action.payload.id]
      });
  },
});

export const { changeCurrentMonth } = calendarSlice.actions;

export const selectCurrentMonth = (state: RootState) => ({
  currentMonthDate: state.generic.currentMonthDate,
  currentMonth: state.generic.currentMonth,
  currentYear: state.generic.currentYear,
});
export const selectDays = (state: RootState): IDay[]  => state.generic.days;
export const selectEvents = (state: RootState, dateKey: string): {
  [key: string]: IEventData
}  => state.generic.events[dateKey];

export const setCurrentMonth = (date: Date): AppThunk => (
    dispatch,
) => {
  const currentMonthIndex = date.getMonth()
  const currentYear = date.getFullYear()

  const daysFromPrevMonthCount = new Date(currentYear, currentMonthIndex, 1).getDay()
  const daysInMonthCount = new Date(currentYear, currentMonthIndex + 1, 0).getDate()
  const daysTotalCount = daysInMonthCount + daysFromPrevMonthCount <= 35 ? 35 : 42
  const daysFromNextMonthCount = daysTotalCount - daysFromPrevMonthCount - daysInMonthCount

  const daysFromPrevMonth = () => {
    if (daysFromPrevMonthCount === 0) return []
    else {
      const year = currentMonthIndex === 0 ? currentYear - 1 : currentYear
      const monthIndex = currentMonthIndex === 0 ? 11 : currentMonthIndex - 1
      const daysInMonthCount = new Date(year, monthIndex + 1, 0).getDate()
      const daysArray = Array.from(Array(daysFromPrevMonthCount), (_, i) => i + daysInMonthCount - daysFromPrevMonthCount + 1)
      return daysArray.map(day => ({date: new Date(year, monthIndex, day)}))
    }
  }
  const daysFromCurrentMonth = () => {
    const daysInMonthCount = new Date(currentYear, currentMonthIndex + 1, 0).getDate()
    const daysArray = Array.from(Array(daysInMonthCount), (_, i) => i + 1)
    return daysArray.map(day => ({date: new Date(currentYear, currentMonthIndex, day)}))
  }
  const daysFromNextMonth = () => {
    if (daysFromNextMonthCount === 0) return []
    else {
      const year = currentMonthIndex === 11 ? currentYear + 1 : currentYear
      const monthIndex = currentMonthIndex === 11 ? 0 : currentMonthIndex + 1
      const daysArray = Array.from(Array(daysFromNextMonthCount), (_, i) => i +  + 1)
      return daysArray.map(day => ({date: new Date(year, monthIndex, day)}))
    }
  }
  const days = [...daysFromPrevMonth(), ...daysFromCurrentMonth(), ...daysFromNextMonth()]
  dispatch(closeModal());
  dispatch(changeCurrentMonth({ date, days }));
  dispatch(changeCurrentMonth({ date, days }));
  dispatch(getEvents({ start: days[0].date, end: days[days.length - 1].date }));
};

export const createEvent = createAsyncThunk(
    'calendar/saveEvent',
    async (event: IEventData) => {
      return await saveEvent(event);
    }
);

export const getEvents = createAsyncThunk(
    'calendar/fetchEvents',
    async (payload: {start: Date, end: Date}) => {
      const response = await fetchEvents(payload.start, payload.end);
      return response.data;
    }
);

export const deleteEvent = createAsyncThunk(
    'calendar/deleteEvent',
    async (payload: {id: string, dateKey: string}) => {
      await fetchDeleteEvent(payload.id, payload.dateKey);
      return payload;
    }
);

export default calendarSlice.reducer;
