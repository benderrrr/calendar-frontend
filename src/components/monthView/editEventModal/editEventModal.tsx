import React, {useCallback, useMemo, useState} from 'react';
import {Button, ClickAwayListener, Popper, TextField, Typography} from "@mui/material";
import {TimePicker} from '@mui/lab';

import './editEventModal.css';
import './../event/event.css';
import {IEventModalData} from "../interfaces";
import {createEvent, editEvent} from "../../../redux/reducers/calendar/calendarSlice";
import {useAppDispatch} from "../../../redux/hooks";
import {useInput} from "../../../utils/hooks";
import {closeModal} from "../../../redux/reducers/modals/modalsSlice";


const getNewDate = (date: Date, hours: number, minutes: number) => {
  const newDate = new Date(date)
  newDate.setHours(hours, minutes, 0)
  return newDate
}

const EditEventModal: React.FC<IEventModalData> = ({
                                                     date, dateKey, eventData
                                                   }) => {
  const dispatch = useAppDispatch();
  const anchorEl = useMemo<HTMLElement | null>(() => document.getElementById(dateKey.toString()), [dateKey]);
  const [startDate, setStartDate] = useState<Date>(getNewDate(date, eventData?.startTime.hours || 11, eventData?.startTime.minutes || 30));
  const [endDate, setEndDate] = useState<Date>(getNewDate(date, eventData?.endTime.hours || 12, eventData?.endTime.minutes || 30));
  const dateLabel = useMemo<string>(() => date.toLocaleDateString(navigator.language, {
    day: 'numeric',
    month: 'long'
  }), [date])

  const titleInput = useInput(eventData?.name)
  const descriptionInput = useInput(eventData?.description)
  const saveHandler = useCallback((): void => {
    const event = {
      name: titleInput.value.trim() || 'New event',
      description: descriptionInput.value.trim(),
      year: startDate.getFullYear(),
      month: startDate.getMonth(),
      day: startDate.getDate(),
      startTime: {hours: startDate.getHours(), minutes: startDate.getMinutes()},
      endTime: {hours: endDate.getHours(), minutes: endDate.getMinutes()},
    }
    dispatch(eventData?._id ? editEvent({...event, _id: eventData._id})  : createEvent(event))
    dispatch(closeModal())
  }, [titleInput.value, descriptionInput.value, startDate, endDate, dispatch, eventData?._id])

  return (
    <ClickAwayListener onClickAway={() => dispatch(closeModal())}>
      <Popper
        anchorEl={anchorEl}
        open={true}
        placement='top'
        style={{zIndex: 1}}
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
              offset: [0, 8],
            },
          },
        ]}
      >
        <div className='event-modal-wrapper' id={'event-modal'}>
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
