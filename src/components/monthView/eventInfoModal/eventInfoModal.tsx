import React, {useMemo} from 'react';
import {ClickAwayListener, Typography, Popper} from "@mui/material";

import './eventInfoModal.css';
import {IEventData} from "../interfaces";
import {useAppDispatch} from "../../../redux/hooks";
import InfoModalButtons from "./buttons";
import {closeModal} from "../../../redux/reducers/modals/modalsSlice";

const MAX_HEIGHT = 331
const WIDTH = 400

const EventInfoModal: React.FC<{ event: IEventData }> = ({event}) => {
  const anchorEl = useMemo<HTMLElement | null>(() => event._id ? document.getElementById(event._id) : null, [event._id]);
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
        <div className='event-info-wrapper' id={'event-info'} style={{maxHeight: MAX_HEIGHT + 'px', width: WIDTH + 'px'}}>
          <InfoModalButtons onExit={() => dispatch(closeModal())} event={event}/>
          <Typography paragraph sx={{marginBottom: 0}}>
            {event.name}
          </Typography>
          <Typography paragraph sx={{marginBottom: 0}}>
            Description: {event.description}
          </Typography>
          <Typography paragraph sx={{marginBottom: 0}}>
            {new Date(event.year, event.month, event.day).toLocaleDateString(navigator.language, {
              weekday: 'long',
              day: 'numeric',
              month: 'long'
            })}
          </Typography>
          <Typography paragraph sx={{marginBottom: 0}}>
            Time: {`${event.startTime.hours}:${event.startTime.minutes} - ${event.endTime.hours}:${event.endTime.minutes}`}
          </Typography>
        </div>
      </Popper>
    </ClickAwayListener>
  );
}

export default EventInfoModal;
