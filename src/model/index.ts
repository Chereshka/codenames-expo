export interface IPuzzle {
  id: number;
  words: Solution;
  optionalWords: string[];
  board: string[];
  x5: string;
  version: string;
  difficulty: number;
}

export type Solution = {
  [key: string]: string[];
};

export interface Piece {
  label: string;
  number: number;
}

export interface GameSave {
  id: number;
  solution: Solution;
  words: string[];
  bonusWords: string[];
  foundWords: string[];
  foundBonusWords: string[];
  pieces: Piece[];
  x5: string;
  difficulty: number;
  version: string;
  solvedStack: string[];
  shareUsed: boolean;
  hintsLeft: number;
  starAchieved: number;
}

export interface Archive {
  [key: number]: GameSave;
}

export type ArchivePreview = {
  id: number;
  total: number;
};
