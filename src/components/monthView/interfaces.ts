export interface IDay {
    date: Date;
}

export interface IEventModalData {
    date: Date;
    dateKey: string;
    eventData?: IEventData;
}

export interface IAllEventsModalData {
    dateKey: string;
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

export interface IIventsStorage {
    [key: string]: {
        [key: string]: IEventData
    }
}