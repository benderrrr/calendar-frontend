import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';

import './monthView.css';
import Day from "./day/day";
import {selectDays, setCurrentMonth} from "../../redux/reducers/calendar/calendarSlice";
import Modals from '../modals';


const MonthView: React.FC = () => {
  const days = useAppSelector(selectDays);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setCurrentMonth(new Date()))
  }, [dispatch]);

  if (!days.length) return null;
  return (
    <>
      <div className='month-view-wrapper'
           style={{gridTemplateRows: `repeat(${days.length / 7}, calc(100% / ${days.length / 7} )`}}>
        {days.map((day, index) =>
          <Day
            {...day}
            key={day.date.toJSON()}
            index={index}
          />
        )}
      </div>
      <Modals/>
    </>
  );
}

export default MonthView;
