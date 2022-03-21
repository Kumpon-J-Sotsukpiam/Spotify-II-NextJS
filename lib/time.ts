import { toInteger } from "lodash";

export function millisToMinutesAndSeconds(millis: number) {
    const minutes = Math.floor(millis / 60000);
    const seconds = Math.floor((millis / 1000) % 60)
    return seconds == 60
        ? (minutes + 1 + ":00")
        : minutes + ':' + (seconds < 10 ? "0" : "") + seconds;
}