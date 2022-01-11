import React, {useMemo} from 'react';
import {ClickAwayListener, Popper, Typography} from "@mui/material";

import './allEventsModal.css';
import {IAllEventsModalData} from "../interfaces";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {closeModal} from "../../../redux/reducers/modals/modalsSlice";
import Event from "../event/event";
import {selectEvents} from "../../../redux/reducers/calendar/calendarSlice";

const MAX_HEIGHT = 400
const WIDTH = 260

const AllEventsModal: React.FC<IAllEventsModalData> = ({date, dateKey}) => {
  const events = useAppSelector(state => selectEvents(state, dateKey));
  const anchorEl = useMemo<HTMLElement | null>(() => document.getElementById(dateKey.toString()), [dateKey]);
  const dispatch = useAppDispatch();

  return (
    <ClickAwayListener onClickAway={() => dispatch(closeModal())}>
      <Popper
        anchorEl={anchorEl}
        open={true}
        placement='bottom'
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
              altBoundary: false,
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
        style={{zIndex: 1}}
      >
        <div className='all-event-wrapper' id={'event-info'}
             style={{maxHeight: MAX_HEIGHT + 'px', width: WIDTH + 'px'}}>
          <Typography paragraph sx={{marginBottom: 0, color: '#70757a', textTransform: 'uppercase'}}>
            {date.toLocaleDateString(navigator.language, {weekday: 'short'})}
          </Typography>
          <Typography paragraph sx={{marginBottom: 0, color: '#70757a'}}>
            {date.toLocaleDateString(navigator.language, {day: 'numeric'})}
          </Typography>
          <div className='events-wrapper all-events-list'>
            {Object.values(events).map(event =>
              <Event eventData={event} key={event._id}/>
            )}
          </div>
        </div>
      </Popper>
    </ClickAwayListener>
  );
}

export default AllEventsModal;
