import { DateTime } from "luxon";

export function endOfDate(date: string): DateTime {
    return DateTime.fromISO(date).endOf('day')
}

export function getNow(): DateTime {
    return DateTime.now()
}