import { Piece, Solution } from "@/model";
import { addDays, differenceInDays } from "date-fns";

export const puzzleStartDate = new Date("2024-03-28T00:00:00");

export function getPuzzleIndexForDate(date: Date) {
  return differenceInDays(date, puzzleStartDate) + 1;
}

export function dateFromPuzzleIndex(index: number) {
  return addDays(puzzleStartDate, index - 1);
}

export function syncPieces(
  pieces: string[],
  solutions: Solution,
  foundWords?: string[]
) {
  const result: Piece[] = [];
  let words = Object.keys(solutions);
  if (foundWords) {
    words = words.filter((e) => !foundWords.includes(e));
  }
  pieces.forEach((e) => {
    result.push({ label: e, number: 0 });
  });
  words.forEach((e) => {
    solutions[e].map((e) => {
      const element = result.findIndex((i) => i.label === e);
      if (element >= 0) {
        result[element].number += 1;
      }
    });
  });
  return result.sort((e, i) => i.number - e.number);
}
