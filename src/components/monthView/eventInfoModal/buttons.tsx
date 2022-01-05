import React, {useMemo} from 'react';
import {ClickAwayListener, IconButton, Popper, Typography, Tooltip} from "@mui/material";

import './eventInfoModal.css';
import {IEventData} from "../interfaces";
import {useAppDispatch} from "../../../redux/hooks";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";


interface IEventInfoModal {
    event: IEventData,
    onExit: () => void
}

const EventInfoModal: React.FC<IEventInfoModal> = ({
                                                       event,
                                                       onExit
                                                   }) => {
    const dispatch = useAppDispatch();
    const anchorEl = document.getElementById(event.id)
    const buttonArray = useMemo(() => [
        {
            title: 'Edit',
            icon: EditIcon,
            onClick: () => null
        },
        {
            title: 'Delete',
            icon: DeleteIcon,
            onClick: () => null
        },
        {
            title: 'Close',
            icon: CloseIcon,
            onClick: onExit
        },
    ], [onExit])
    return (
        <ClickAwayListener onClickAway={onExit}>
            <Popper
                anchorEl={anchorEl}
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
                <div className='event-info-wrapper' id={'event-info'}>
                    <div className={'buttons'}>
                        <Tooltip title={'Edit'}>
                            <IconButton size="small" onClick={() => {}}>
                                <EditIcon/>
                            </IconButton>
                        </Tooltip>
                        <IconButton size="small" onClick={() => {}}>
                            <DeleteIcon/>
                        </IconButton>
                        <IconButton size="small" onClick={onExit}>
                            <CloseIcon/>
                        </IconButton>
                    </div>
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
