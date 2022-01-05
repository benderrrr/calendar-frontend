import {IEventData, IIventsStorage} from "../../../components/monthView/interfaces";
import {generateId, getDateKeyFromDate, getDateKeyFromEvent} from "../../../utils/generic";



export function saveEvent(event: IEventData) {
  const storageEvents = localStorage.getItem('events')
  const allEvents: IIventsStorage = storageEvents ? JSON.parse(storageEvents) : {}
  const dataKey = getDateKeyFromEvent(event)
  const id = event.id || generateId(14)
  localStorage.setItem('events', JSON.stringify({
    ...allEvents,
      [dataKey]: {
          ...allEvents[dataKey],
          [id]: {...event, id}
      }
  }))
  return new Promise<IEventData>((resolve) =>
      setTimeout(() => resolve({...event, id}), 500)
  );
}

export function fetchEvents(start: Date, end: Date) {
  const storageEvents = localStorage.getItem('events')
  const allEvents: IIventsStorage = storageEvents ? JSON.parse(storageEvents) : []
  const startDateKey: number = Number(getDateKeyFromDate(start));
  const endDateKey: number = Number(getDateKeyFromDate(end));
  const result = Object.fromEntries(Object.entries(allEvents).filter(([key]) => {
      const dateKey = Number(key)
    return dateKey >= startDateKey && dateKey < endDateKey
  }))
  return new Promise<{ data: IIventsStorage }>((resolve) =>
      setTimeout(() => resolve({ data: result }), 500)
  );
}

export function fetchDeleteEvent(id: string, dateKey: string) {
  const storageEvents = localStorage.getItem('events')
  const allEvents: IIventsStorage = storageEvents ? JSON.parse(storageEvents) : []
  delete allEvents[dateKey][id]
  localStorage.setItem('events', JSON.stringify(allEvents))
  return new Promise<void>((resolve) =>
      setTimeout(() => resolve(), 500)
  );
}