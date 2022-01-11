import {IEventData, IIventsStorage, INewEventDataRequest} from "../../../components/monthView/interfaces";
import {httpMethod, request} from "../../../utils/api";


export function fetchSaveEvent(event: INewEventDataRequest) {
  const url = 'http://localhost:4444/api/events/newEvent';
  return request(url, httpMethod.POST, event);
}

export function fetchEditEvent(event: IEventData) {
  const url = 'http://localhost:4444/api/events/editEvent';
  return request(url, httpMethod.PUT, event);
}

export function fetchEvents(start: Date, end: Date) {
  const url = `
    http://localhost:4444/api/events/getEvents?startYear=${start.getFullYear()}&startMonth=${start.getMonth()}&startDay=${start.getDate()}&endYear=${end.getFullYear()}&endMonth=${end.getMonth()}&endDay=${end.getDate()}
  `;
  return request(url, httpMethod.GET);
  /*
    const storageEvents = localStorage.getItem('events')
    const allEvents: IIventsStorage = storageEvents ? JSON.parse(storageEvents) : []
    const startDateKey: number = Number(getDateKeyFromDate(start));
    const endDateKey: number = Number(getDateKeyFromDate(end));
    const result = Object.fromEntries(Object.entries(allEvents).filter(([key]) => {
        const dateKey = Number(key)
      return dateKey >= startDateKey && dateKey < endDateKey
    }))
    return new Promise<IIventsStorage>((resolve) =>
        setTimeout(() => resolve(result), 500)
    );*/
}

export function fetchDeleteEvent(id: string, dateKey: number) {
  const storageEvents = localStorage.getItem('events')
  const allEvents: IIventsStorage = storageEvents ? JSON.parse(storageEvents) : []
  delete allEvents[dateKey][id]
  localStorage.setItem('events', JSON.stringify(allEvents))
  return new Promise<void>((resolve) =>
    setTimeout(() => resolve(), 500)
  );
}