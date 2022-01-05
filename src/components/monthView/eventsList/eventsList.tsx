import React, {useCallback, useMemo, useRef} from 'react';

import './eventsList.css';
import Event from "../event/event";
import {selectEvents} from "../../../redux/reducers/calendar/calendarSlice";
import {useAppSelector} from "../../../redux/hooks";
import CaptureResize from "../../hocs/captureResize";

interface IEventsListComponent {
    dateKey: string,
}

const EventsList: React.FC<IEventsListComponent> = ({dateKey}) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const events = useAppSelector(state => selectEvents(state, dateKey));
    const eventsListArray = useMemo(() => events && Object.values(events), [events]);
    const moreEventsClickHandler = useCallback((e: React.MouseEvent<HTMLDivElement>): void => {
        e.stopPropagation()
    },[])
    if (!events || !Object.values(events).length) return null;
    return (
        <CaptureResize captureRef={wrapperRef}>
            {(size: DOMRect): React.ReactElement => {
                const maxElementsCount = size ? Math.floor(size.height / 22) : 0
                const countEventsForShow = eventsListArray.length <= maxElementsCount ? eventsListArray.length : maxElementsCount - 1
                const overCountEvents = eventsListArray.length - countEventsForShow
                return (
                    <div className='events-wrapper' ref={wrapperRef}
                         style={{gridTemplateRows: `repeat(${countEventsForShow}, 22px`}}>
                        {size && eventsListArray.slice(0, countEventsForShow).map(event =>
                            <Event eventData={event} key={event.id} />
                        )}
                        {!!overCountEvents && (
                            <div className={'event-wrapper'} onClick={moreEventsClickHandler}>
                                <p className={'bold-text'}>{overCountEvents} more</p>
                            </div>
                        )}
                    </div>
                )
            }}
        </CaptureResize>
    );
}

export default EventsList;
