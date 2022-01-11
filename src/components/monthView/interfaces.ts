export interface IDay {
    date: Date;
}

export interface IEventModalData {
    date: Date;
    dateKey: number;
    eventData?: IEventData;
}

export interface IAllEventsModalData {
    dateKey: number;
    date: Date;
}

export interface INewEventDataRequest {
    name: string;
    description: string;
    year: number;
    month: number;
    day: number;
    startTime: {
        hours: number,
        minutes: number
    };
    endTime: {
        hours: number,
        minutes: number
    };
}

export interface IEventData extends INewEventDataRequest{
    _id: string;
}

type TEvent = Record<string, IEventData>

export type IIventsStorage = Record<number, TEvent>