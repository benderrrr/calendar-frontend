import React, {useCallback, useMemo, useRef} from 'react';

import './day.css';
import {IDay} from "../interfaces";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {selectCurrentMonth} from "../../../redux/reducers/calendar/calendarSlice";
import EventsList from "../eventsList/eventsList";
import {getDateKeyFromDate} from "../../../utils/generic";
import {modalsTypes, openModal, selectModalData} from '../../../redux/reducers/modals/modalsSlice';

interface IDayComponent extends IDay {
  index: number,
}

const Day: React.FC<IDayComponent> = ({
                                        date,
                                        index,
                                      }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const monthDay = useMemo<number>(() => date.getDate(), [date]);
  const month = useMemo<number>(() => date.getMonth(), [date]);

  const dispatch = useAppDispatch();
  const currentDate = useAppSelector(selectCurrentMonth);
  const {modalType} = useAppSelector(selectModalData);
  const isDayFromCurrentMonth = useMemo<boolean>(() => currentDate.currentMonth === month, [month, currentDate.currentMonth]);
  const isToday = useMemo<boolean>(() => {
    const today = new Date();
    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth();
    const todayMonthDay = today.getDate();
    return monthDay === todayMonthDay && todayMonth === month && todayYear === date.getFullYear();
  }, [date, monthDay, month]);
  const dateKey = useMemo<number>(() => getDateKeyFromDate(date), [date])

  const onClickHandler = useCallback((): void => {
    dispatch(openModal({modalType: modalsTypes.editEvent, modalMetaData: {date, dateKey}}))
  }, [date, dateKey, dispatch])

  const withDayName = useMemo<boolean>(() => index < 7, [index]);
  const gridTemplateRows = useMemo<string>(() => withDayName ? '20px 32px 1fr' : '32px 1fr', [withDayName]);


  return (
    <div className='day-wrapper' onClick={modalType ? () => null : onClickHandler} ref={wrapperRef} style={{gridTemplateRows}} id={dateKey.toString()}>
      {withDayName && (
        <span className='week-day'>
                     {date.toLocaleDateString(navigator.language, {weekday: 'short'})}
                </span>
      )}
      <h2 className={`date${isDayFromCurrentMonth ? ' current-month' : ''}${isToday ? ' today' : ''}`}>
        {monthDay}
      </h2>
      <EventsList dateKey={dateKey} date={date}/>
    </div>
  );
}

export default Day;
