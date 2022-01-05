import React, {useCallback, useLayoutEffect, useMemo, useRef, useState} from 'react';

import './eventsList.css';
import Event from "../event/event";
import {selectEvents} from "../../../redux/reducers/generic/genericSlice";
import {useAppSelector} from "../../../redux/hooks";

interface IEventsListComponent {
    dateKey: string
}

//type ComponentWithChildProps = React.PropsWithChildren<{captureRef: React.RefObject<HTMLElement>}>;

interface ICaptureResize {
    captureRef: React.RefObject<HTMLElement>,
    children(size: DOMRect): React.ReactElement
}

const CaptureResize: React.FC<ICaptureResize> = (props) => {
    const {captureRef, children} = props
    const [size, setSize] = useState<DOMRect>(new DOMRect());

    const updateSize = useCallback((): void => {
        captureRef?.current && setSize(captureRef.current.getBoundingClientRect());
    }, [captureRef])

    useLayoutEffect(() => {
        updateSize();
        window.addEventListener("resize", updateSize);
        return () =>
            window.removeEventListener("resize", updateSize);
    }, [updateSize]);
    return children(size)
}

const EventsList: React.FC<IEventsListComponent> = ({dateKey}) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const events = useAppSelector(state => selectEvents(state, dateKey));
    const eventsListArray = useMemo(() => events && Object.values(events), [events]);
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
                            <Event eventData={event} key={event.id}/>
                        )}
                        {!!overCountEvents && (
                            <div className={'event-wrapper'}>
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
