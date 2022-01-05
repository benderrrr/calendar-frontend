import {IEventData, IIventsStorage} from "../../../components/monthView/interfaces";
import {getDataKeyFromDate, getDataKeyFromEvent} from "../../../utils/generic";



export function saveEvent(event: IEventData) {
  const storageEvents = localStorage.getItem('events')
  const allEvents: IIventsStorage = storageEvents ? JSON.parse(storageEvents) : {}
  const dataKey = getDataKeyFromEvent(event)
  localStorage.setItem('events', JSON.stringify({
    ...allEvents,
      [dataKey]: {
          ...allEvents[dataKey],
          [event.id]: event
      }
  }))
  return new Promise<IEventData>((resolve) =>
      setTimeout(() => resolve(event), 500)
  );
}

export function fetchEvents(start: Date, end: Date) {
  const storageEvents = localStorage.getItem('events')
  const allEvents: IIventsStorage = storageEvents ? JSON.parse(storageEvents) : []
  const startDateKey: number = Number(getDataKeyFromDate(start));
  const endDateKey: number = Number(getDataKeyFromDate(end));
  const result = Object.fromEntries(Object.entries(allEvents).filter(([key, events]) => {
      const dateKey = Number(key)
    return dateKey >= startDateKey && dateKey < endDateKey
  }))
  return new Promise<{ data: IIventsStorage }>((resolve) =>
      setTimeout(() => resolve({ data: result }), 500)
  );
}