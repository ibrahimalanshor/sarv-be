import { DateTime } from "luxon";

export function endOfDate(date: string): DateTime {
    return DateTime.fromISO(date).endOf('day')
}

export function getNow(): DateTime {
    return DateTime.now()
}

export function plusDate(date: DateTime, value: { unit: 'hour', value: number }): DateTime {
    return date.plus({ [value.unit]: value.value })
}