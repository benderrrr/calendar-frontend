import React, {useCallback} from 'react';
import './event.css'

import {IEventData} from "../interfaces";
import {useAppDispatch} from "../../../redux/hooks";
import {modalsTypes, openModal} from "../../../redux/reducers/modals/modalsSlice";

interface IEventComponent {
    eventData: IEventData,
}

const Event: React.FC<IEventComponent> = ({eventData}) => {
    const dispatch = useAppDispatch();
    const clickHandler = useCallback((e: React.MouseEvent<HTMLDivElement>): void => {
        e.stopPropagation()
        dispatch(openModal({modalType: modalsTypes.showEvent, modalMetaData: eventData}))
    }, [dispatch, eventData])

    return (
        <div className='event-wrapper' onClick={clickHandler} id={eventData._id}>
            <p>{eventData.startTime.hours}:{eventData.startTime.minutes} <span
                className={'bold-text'}>{eventData.name}</span></p>
        </div>
    );
}

export default Event;
