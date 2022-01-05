export interface IDay {
    date: Date;
}

export interface IEventModalData {
    date: Date;
    dateKey: string;
    eventData?: IEventData;
}

export interface IEventData {
    id?: string;
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

export interface IIventsStorage {
    [key: string]: {
        [key: string]: IEventData
    }
}