import React, {useCallback, useMemo, useRef} from 'react';

import './eventsList.css';
import Event from "../event/event";
import {selectEvents} from "../../../redux/reducers/calendar/calendarSlice";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import CaptureResize from "../../hocs/captureResize";
import {modalsTypes, openModal, selectModalData} from "../../../redux/reducers/modals/modalsSlice";

interface IEventsListComponent {
  dateKey: number,
  date: Date,
}

const EventsList: React.FC<IEventsListComponent> = ({dateKey, date}) => {
  const dispatch = useAppDispatch();
  const {modalType} = useAppSelector(selectModalData);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const events = useAppSelector(state => selectEvents(state, dateKey));
  const eventsListArray = useMemo(() => events && Object.values(events), [events]);
  const moreEventsClickHandler = useCallback((e: React.MouseEvent<HTMLDivElement>): void => {
    dispatch(openModal({modalType: modalsTypes.allEvents, modalMetaData: {dateKey, date}}))
    e.stopPropagation()
  }, [date, dateKey, dispatch])
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
              <Event eventData={event} key={event._id}/>
            )}
            {!!overCountEvents && (
              <div className={'event-wrapper'} onClick={modalType ? () => null : moreEventsClickHandler}>
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
