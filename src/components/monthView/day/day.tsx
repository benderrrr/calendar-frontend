import React, { useMemo, useRef } from 'react';

import './day.css';
import {IDay} from "../interfaces";
import {useAppSelector} from "../../../redux/hooks";
import {selectCurrentMonth, selectDays} from "../../../redux/reducers/generic/genericSlice";

interface IDayComponent extends IDay {
    index: number
}

const Day: React.FC<IDayComponent> = ({
                                          date,
                                          index
                                      }) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const monthDay = useMemo<number>(() => date.getDate(), [date]);
    const month = useMemo<number>(() => date.getMonth(), [date]);

    const currentDate = useAppSelector(selectCurrentMonth);
    const isDayFromCurrentMonth = useMemo<boolean>(() => currentDate.currentMonth === month, [month, currentDate.currentMonth]);


    const isToday = useMemo<boolean>(() => {
        const today = new Date();
        const todayYear = today.getFullYear()
        const todayMonth = today.getMonth()
        const todayMonthDay = today.getDate()
        return monthDay === todayMonthDay && todayMonth === month && todayYear === date.getFullYear()
    }, [date, monthDay, month]);

    const onClickHandler = () => {
        console.log(wrapperRef?.current?.getBoundingClientRect())
    }

    return (
        <div className='day-wrapper' onClick={onClickHandler} ref={wrapperRef}>
            {index < 7 && <span className='week-day'>
                 {date.toLocaleDateString(navigator.language, {weekday: 'short'})}
            </span>}
            <h2 className={`date${isDayFromCurrentMonth ? ' current-month' : ''}${isToday ? ' today' : ''}`}>
                {monthDay}
            </h2>
        </div>
    );
}

export default Day;
