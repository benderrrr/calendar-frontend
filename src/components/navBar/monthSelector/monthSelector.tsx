import React, {useCallback, useMemo, useState} from 'react';
import LeftIcon from '@mui/icons-material/ChevronLeft';
import RightIcon from '@mui/icons-material/ChevronRight';
import DownIcon from '@mui/icons-material/ArrowDropDown';
import {styled} from '@mui/material/styles';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import CalendarPicker from '@mui/lab/CalendarPicker';
import {Button, IconButton, Tooltip} from '@mui/material';

import './monthSelector.css';
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {selectCurrentMonth, setCurrentMonth} from "../../../redux/reducers/calendar/calendarSlice";

const MonthButton = styled(Button)({
    color: '#3c4043',
    backgroundColor: '#FFF',
    fontSize: '22px',
    fontWeight: 400,
    letterSpacing: 0,
    lineHeight: '26px',
    textTransform: 'capitalize',
    boxShadow: 'none',
    padding: '0 5px',
    '&:hover': {
        backgroundColor: '#5f63680A',
        color: '#3c4043',
        boxShadow: 'none',
    },
});

const MonthSelector: React.FC = () => {
    const {currentMonthDate, currentMonth, currentYear} = useAppSelector(selectCurrentMonth);
    const dispatch = useAppDispatch();
    const [isCalendarPicker, setIsCalendarPicker] = useState<boolean>(false)
    const monthLabel = useMemo<string>(
        () => currentMonthDate
            ? `${currentMonthDate?.toLocaleDateString(navigator.language, {month: 'long'})} ${currentYear}`
            : ''
        ,
        [currentMonthDate, currentYear])
    const goToPrevMonth = useCallback((): void => {
        const year = currentMonth === 0 ? currentYear - 1 : currentYear
        const month = currentMonth === 0 ? 11 : currentMonth - 1
        dispatch(setCurrentMonth(new Date(year, month)))
    }, [currentMonth, currentYear, dispatch])
    const goToNextMonth = useCallback((): void => {
        const year = currentMonth === 11 ? currentYear + 1 : currentYear
        const month = currentMonth === 11 ? 0 : currentMonth + 1
        dispatch(setCurrentMonth(new Date(year, month)))
    }, [currentMonth, currentYear, dispatch])

    return (
        <div className='month-selector-wrapper'>
            <Tooltip title={'Previous month'}>
                <IconButton size="small" onClick={goToPrevMonth}>
                    <LeftIcon/>
                </IconButton>
            </Tooltip>
            <Tooltip title={'Next month'}>
                <IconButton size="small" onClick={goToNextMonth}>
                    <RightIcon/>
                </IconButton>
            </Tooltip>
            <ClickAwayListener onClickAway={() => setIsCalendarPicker(false)} mouseEvent={'onMouseUp'}>
                <div className={'month-selector-button-wrapper'}>
                    <MonthButton variant="contained" endIcon={<DownIcon/>} onClick={() => setIsCalendarPicker(true)}>
                        {monthLabel}
                    </MonthButton>

                    {isCalendarPicker && <div className={'calendar-picker-wrapper'}>
                        <CalendarPicker date={currentMonthDate} onChange={(newValue) => {
                            dispatch(setCurrentMonth(newValue as Date))
                        }}/>
                    </div>}
                </div>
            </ClickAwayListener>
        </div>
    );
}

export default MonthSelector;
