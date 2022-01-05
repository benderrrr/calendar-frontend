import React, {useCallback, useMemo, useRef, useState} from 'react';
import {Button, ClickAwayListener, Popper, TextField, Typography} from "@mui/material";
import {TimePicker} from '@mui/lab';

import './editEventModal.css';
import './../event/event.css';
import {IEventModalData} from "../interfaces";
import {createEvent} from "../../../redux/reducers/generic/genericSlice";
import {useAppDispatch} from "../../../redux/hooks";
import {generateId} from "../../../utils/generic";
import {useInput} from "../../../utils/hooks";


interface IEventModal {
    eventModalData: IEventModalData,
    onExit: () => void
}

const getNewDate = (date: Date, hours: number, minutes: number) => {
    const newDate = new Date(date)
    newDate.setHours(hours, minutes, 0)
    return newDate
}

const EditEventModal: React.FC<IEventModal> = ({
                                               eventModalData,
                                               onExit
                                           }) => {
    const dispatch = useAppDispatch();
    const {date, dayElement} = eventModalData;
    const [startDate, setStartDate] = useState<Date>(getNewDate(date, 11, 30));
    const [endDate, setEndDate] = useState<Date>(getNewDate(date, 12, 30));
    const wrapperRef = useRef<HTMLDivElement>(null);
    const dateLabel = useMemo<string>(() => date.toLocaleDateString(navigator.language, {
        day: 'numeric',
        month: 'long'
    }), [date])
    /*    const popperPlacement = useMemo<string>(() => {
            const { left, right } = dayElement.getBoundingClientRect()
            const { innerWidth, innerHeight } = window
            let result = left > innerWidth - right ? 'left' : 'right'
            return result
            }
        , [dayElement])*/
    const titleInput = useInput()
    const descriptionInput = useInput()
    const saveHandler = useCallback((): void => {
        dispatch(createEvent({
            id: generateId(14),
            name: titleInput.value.trim(),
            description: descriptionInput.value.trim(),
            year: startDate.getFullYear(),
            month: startDate.getMonth(),
            day: startDate.getDate(),
            startTime: { hours: startDate.getHours(), minutes: startDate.getMinutes()},
            endTime: { hours: endDate.getHours(), minutes: endDate.getMinutes()},
        }))
        onExit()
    }, [dispatch, titleInput.value, descriptionInput.value, startDate, endDate, onExit])

    return (
        <ClickAwayListener onClickAway={onExit}>
            <Popper
                anchorEl={dayElement}
                open={true}
                placement='left'
                disablePortal={false}
                modifiers={[
                    {
                        name: 'flip',
                        enabled: true,
                        options: {
                            altBoundary: true,
                            rootBoundary: 'document',
                            padding: 8,
                        },
                    },
                    {
                        name: 'preventOverflow',
                        enabled: true,
                        options: {
                            altAxis: true,
                            altBoundary: true,
                            tether: true,
                            rootBoundary: 'document',
                            padding: 8,
                        },
                    },
                    {
                        name: 'offset',
                        options: {
                            offset: [8, 8],
                        },
                    },
                ]}
            >
                <div className='event-modal-wrapper' ref={wrapperRef} id={'event-modal'}>
                    <TextField label="Add title" variant="standard" fullWidth {...titleInput}/>
                    <TextField label="Add description" variant="standard" fullWidth {...descriptionInput}/>
                    <Typography paragraph sx={{marginBottom: 0}}>
                        {dateLabel}
                    </Typography>
                    <div className='time-pickers-wrapper'>
                        <TimePicker
                            label="Start time"
                            value={startDate}
                            onChange={(newValue) => setStartDate(prev => newValue || prev)}
                            renderInput={(params) => <TextField {...params} />}
                            maxTime={endDate}
                        />
                        <TimePicker
                            label="End time"
                            value={endDate}
                            onChange={(newValue) => setEndDate(prev => newValue || prev)}
                            renderInput={(params) => <TextField {...params} />}
                            minTime={startDate}
                        />
                    </div>
                    <Button variant="contained" sx={{display: 'block', marginLeft: 'auto'}}
                            onClick={saveHandler}>Save</Button>
                </div>
            </Popper>
        </ClickAwayListener>
    );
}

export default EditEventModal;
