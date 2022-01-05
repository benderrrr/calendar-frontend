import React, { useMemo } from 'react';
import EventNoteIcon from '@mui/icons-material/EventNote';

import './index.css';
import { Button, Tooltip } from '@mui/material';
import MonthSelector from "./monthSelector/monthSelector";
import {setCurrentMonth} from "../../redux/reducers/calendar/calendarSlice";
import {useAppDispatch} from "../../redux/hooks";

const Index: React.FC = () => {
    const todayTooltip = useMemo<string>(() => {
        const today = new Date();
        return today.toLocaleDateString(navigator.language, {weekday: 'long', day: 'numeric', month: 'long'})
    }, [])
    const dispatch = useAppDispatch();

    return (
        <nav className='nav-wrapper'>
            <div className='logo'>
                <EventNoteIcon />
                <span>Calendar</span>
            </div>
            <Tooltip title={todayTooltip}>
                <Button variant="outlined" onClick={() => dispatch(setCurrentMonth(new Date()))}>Today</Button>
            </Tooltip>
            <MonthSelector/>
        </nav>
    );
}

export default Index;
