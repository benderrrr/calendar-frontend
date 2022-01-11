import {IEventData} from "../components/monthView/interfaces";

export const generateId = (length: number): string => {
    const symbols = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    return Array.apply(null, Array(length)).map(() => symbols.charAt(Math.floor(Math.random() * symbols.length))).join('');
}

export const makeTwoDigit = (value: string | number): string => {
    const numberValue = typeof value === "number" ? value : Number(value)
    return `${numberValue < 10 ? '0' : ''}${numberValue}`
}

export const getDateKeyFromEvent = (event: IEventData): number => Number([event.year, makeTwoDigit(event.month), makeTwoDigit(event.day)].join(''))

export const getDateKeyFromDate = (date: Date): number => Number([date.getFullYear(), makeTwoDigit(date.getMonth()), makeTwoDigit(date.getDate())].join(''))