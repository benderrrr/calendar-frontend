import {createAsyncThunk, createSlice, isAnyOf, PayloadAction} from '@reduxjs/toolkit';
import {AppThunk, RootState} from '../../store';
import {IDay, IEventData, INewEventDataRequest, IIventsStorage} from "../../../components/monthView/interfaces";
import {fetchEvents, fetchSaveEvent, fetchDeleteEvent, fetchEditEvent} from "./calendarAPI";
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
      .addCase(getEvents.fulfilled, (state, action: PayloadAction<IEventData[]>) => {
        if (action.payload.length) {
          state.events = action.payload.reduce((acc, event) => {
            const dataKey = getDateKeyFromEvent(event)
            return {
              ...acc,
              [dataKey]: {...acc[dataKey], [event._id]: event}
            }
          },  {} as IIventsStorage)
        }
      })
      .addCase(deleteEvent.fulfilled, (state, action: PayloadAction<{ id: string, dateKey: number }>) => {
        const newEvents = {...state.events}
        delete newEvents[action.payload.dateKey][action.payload.id]
      })
      .addMatcher(isAnyOf (editEvent.fulfilled, createEvent.fulfilled), (state, action: PayloadAction<IEventData>) => {
        const dateKey = getDateKeyFromEvent(action.payload)
        if (action.payload._id) {
          state.events[dateKey] = {...state.events[dateKey], [action.payload._id]: action.payload}
        }
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
export const selectEvents = (state: RootState, dateKey: number): {
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
  dispatch(getEvents({ start: days[0].date, end: days[days.length - 1].date }));
};

export const editEvent = createAsyncThunk(
    'calendar/fetchEditEvent',
    async (event: IEventData) => {
      return (await fetchEditEvent(event)).event;
    }
);

export const createEvent = createAsyncThunk(
    'calendar/fetchSaveEvent',
    async (event: INewEventDataRequest) => {
      return (await fetchSaveEvent(event)).event;
    }
);

export const getEvents = createAsyncThunk(
    'calendar/fetchEvents',
    async (payload: {start: Date, end: Date}) => {
      const result = await fetchEvents(payload.start, payload.end);
      return result.events
    }
);

export const deleteEvent = createAsyncThunk(
    'calendar/deleteEvent',
    async (payload: {id: string, dateKey: number}) => {
      await fetchDeleteEvent(payload.id, payload.dateKey);
      return payload;
    }
);

export default calendarSlice.reducer;
