import React, { useMemo } from 'react';
import EventNoteIcon from '@mui/icons-material/EventNote';

import './index.css';
import { Button, Tooltip } from '@mui/material';

const Index: React.FC = () => {
    const todayTooltip = useMemo<string>(() => {
        const today = new Date();
        return today.toLocaleDateString(navigator.language, {weekday: 'long', day: 'numeric', month: 'long'})
    }, [])
    return (
        <nav className='nav-wrapper'>
            <div className='logo'>
                <EventNoteIcon />
                <span>Calendar</span>
            </div>
            <Tooltip title={todayTooltip}>
                <Button variant="outlined" className={'today-button'}>Today</Button>
            </Tooltip>
        </nav>
    );
}

export default Index;
