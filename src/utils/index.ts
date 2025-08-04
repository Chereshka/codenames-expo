import { Piece } from "@/model";
import { differenceInSeconds, format, isToday, isYesterday, parse, startOfTomorrow } from "date-fns";

function shuffleArray(array: unknown[]): unknown[] {
    const copy = array.slice();
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

function createDateStamp(): string {
    return format(new Date(), 'yyyy-MM-dd');
}

function wasItYesterdayUtil(date_old: string): boolean {
    return isYesterday(parseDateStamp(date_old));
}

function wasItTodayUtil(stamp: string): boolean {
    return isToday(parseDateStamp(stamp));
}

function parseDateStamp(stamp: string): Date {
    return parse(stamp, 'yyyy-MM-dd', new Date());
}

function getSecondsToNextDay(): number {
    return differenceInSeconds(startOfTomorrow(), new Date())
}

function secondsToHuman(seconds: number): string {
    const s = seconds % 60;
    const m = Math.floor(seconds / 60) % 60;
    const h = Math.floor(seconds / 3600);

    const pad = (e: number) => e.toString().padStart(2, '0');
    if (h === 0) {
        return `${pad(m)}:${pad(s)}`;
    }
    return `${pad(h)}:${pad(m)}:${pad(s)}`;
}

const noop = () => {
    return;
}

const LegacyCopy = (text: string) => {
    const dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}

const copyToClipboard = async (text: string) => {
    if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
    } else {
        LegacyCopy(text);
    }
}

const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const specialShuffle = (pieces: Piece[], solvedStack: string[]): Piece[] => {
    const solvedPrio = pieces.filter((e) => solvedStack.includes(e.label));
    const solvedTotal = pieces.filter((e) => e.number <= 0).filter((c) => !solvedStack.includes(c.label));
    const unsolved = pieces.filter((e) => e.number > 0);
    return [...shuffleArray(unsolved), ...solvedPrio, ...solvedTotal] as Piece[];
}

export { sleep, specialShuffle, copyToClipboard, wasItYesterdayUtil, wasItTodayUtil, shuffleArray, createDateStamp, parseDateStamp, noop, getSecondsToNextDay, secondsToHuman }