import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { setOpenModal } from "./Navigation";
import { createDateStamp, specialShuffle } from "../../utils";
import { Archive, ArchivePreview, IPuzzle } from "@/model";
import { getPuzzleIndexForDate, syncPieces } from "@/utils/puzzle";
import AES from "crypto-js/aes";
import enc from "crypto-js/enc-utf8";
import { player } from "@/components/wrappers/PostHydration";
// import { v4 as uuidv4 } from "uuid";

type MessageBubble = {
  type: "good" | "bad";
  message: string;
};

export interface GameState {
  isNewPlayer: boolean;
  userId: string;
  archive: Archive;
  input: string[];
  messageBubble: MessageBubble | null;
  currentGameId: number;
  lastDailyWin?: string;
  currentStreak: number;
  bestStreak: number;
  hideLabels: boolean;
  isSubmiting: boolean;
  isReviewAsked: boolean;
  groupBy: "order" | "length";
  archivePreview: ArchivePreview[];
  archiveLoading: boolean;
  puzzleLoading: boolean;
}

const initialState: GameState = {
  isNewPlayer: true,
  userId: "android",
  archive: {},
  input: [],
  messageBubble: null,
  currentGameId: 0,
  currentStreak: 0,
  bestStreak: 0,
  hideLabels: true,
  isSubmiting: false,
  isReviewAsked: false,
  groupBy: "length",
  archivePreview: [],
  archiveLoading: false,
  puzzleLoading: false,
};

const decideBubble = (n: number) => {
  if (n === 4) {
    return `Good! +${n}`;
  }
  if (n > 4 && n < 7) {
    return `Great! +${n}`;
  }
  if (n >= 7) {
    return `Amazing! +${n}`;
  }
  return `Good! +${n}`;
};

interface GameError {
  type: "too_short" | "no_word" | "found";
  message: string;
}

export const decreasePieces = createAsyncThunk(
  "game/decrease",
  async (
    stuff: { input: string[] },
    { dispatch, getState, fulfillWithValue, rejectWithValue }
  ) => {
    try {
      const archive = (getState() as RootState).game.archive;
      const currentIdx = (getState() as RootState).game.currentGameId;
      stuff.input.forEach(async (e) => {
        const index = archive[currentIdx].pieces.findIndex(
          (a) => a.label === e
        );
        if (archive[currentIdx].pieces[index].number <= 1) {
          dispatch(addToSolvedStack([e, ...archive[currentIdx].solvedStack]));
        }
        dispatch(decreasonator({ id1: currentIdx, id2: index }));
      });

      return fulfillWithValue("success");
    } catch (err) {
      const error: Error = err as Error;
      return rejectWithValue(error.message);
    }
  }
);

export const submit = createAsyncThunk(
  "game/submit",
  async (
    stuff: any,
    { getState, dispatch, fulfillWithValue, rejectWithValue }
  ) => {
    try {
      const input = (getState() as RootState).game.input;
      const currentGameId = (getState() as RootState).game.currentGameId;
      const found = (getState() as RootState).game.archive[currentGameId]
        .foundWords;
      const reviewAsked = (getState() as RootState).game.isReviewAsked;
      const disableSound = (getState() as RootState).options.disableSound;

      const words = (getState() as RootState).game.archive[currentGameId].words;
      const bonusWords = (getState() as RootState).game.archive[currentGameId]
        .bonusWords;
      const foundBonusWords = (getState() as RootState).game.archive[
        currentGameId
      ].foundBonusWords;
      const wordOfDay = (getState() as RootState).game.archive[currentGameId]
        .x5;

      const word = input.join("");

      const isPrimary = words.includes(word);
      const isBonus = bonusWords.includes(word);
      const isWordOfDay = wordOfDay === word;

      let err: GameError | null = null;

      if (!isPrimary && !isBonus && !isWordOfDay) {
        err = { type: "no_word", message: "Word not found" };
      }

      if (word.length < 4) {
        err = { type: "too_short", message: "Too short" };
      }

      if (found.includes(word) || foundBonusWords.includes(word)) {
        err = { type: "found", message: "Already found" };
      }

      if (!err) {
        if (isPrimary) {
          //win
          if (found.length + 1 === words.length) {
            dispatch(updateLastDailyPlay(createDateStamp()));
            const currentStreak = (getState() as RootState).game.currentStreak;
            const bestStreak = (getState() as RootState).game.bestStreak;
            dispatch(setBestStreak(Math.max(currentStreak + 1, bestStreak)));
            dispatch(setCurrentStreak(currentStreak + 1));
            setTimeout(() => dispatch(setOpenModal("game-end")), 3000);
          }
          if (!disableSound) player.soundCorrect();
          await stuff.success();
          dispatch(addToFound(word));

          dispatch(
            setBubble({ type: "good", message: decideBubble(word.length) })
          );
          dispatch(decreasePieces({ input: input }));
          dispatch(setIsNewPlayer(false));

          const updatedFound = (getState() as RootState).game.archive[
            currentGameId
          ].foundWords;
          const currentScore = updatedFound.reduce((a, e) => a + e.length, 0);
          const totalPoints = words.reduce((a, e) => a + e.length, 0);
          const percentage = (currentScore / totalPoints) * 100;
          const starAchieved = (getState() as RootState).game.archive[
            currentGameId
          ].starAchieved;

          if (percentage >= 25 && starAchieved === 0) {
            dispatch(refillHintsLeft(1));
            dispatch(setStarAchieved(1));
          }

          if (percentage >= 50 && starAchieved === 1) {
            dispatch(refillHintsLeft(1));
            dispatch(setStarAchieved(2));
          }

          if (percentage >= 75 && starAchieved === 2) {
            dispatch(refillHintsLeft(1));
            dispatch(setStarAchieved(3));
          }
        }

        if (isBonus) {
          if (!disableSound) player.soundCorrect();
          await stuff.success();
          dispatch(addToBonusFound(word));
          dispatch(setBubble({ type: "good", message: "Bonus word" }));
        }

        if (isWordOfDay) {
          // Notify(
          //   "Found word of the day",
          //   "You have found bonus word of the day"
          // );
          dispatch(refillHintsLeft(1));
          if (!disableSound) player.soundCorrect();
          await stuff.success();
          dispatch(addToBonusFound(word));
          dispatch(setBubble({ type: "good", message: "Bonus word" }));
        }
      }

      //Review modal handling
      if (
        !reviewAsked &&
        Math.round((found.length / words.length) * 100) >= 20
      ) {
        dispatch(setOpenModal("feedback"));
        dispatch(toggleReviewAsked());
      }

      if (err) {
        if (!disableSound) player.soundFail();
        await stuff.fail();
        dispatch(setBubble({ type: "bad", message: err.message }));
      }

      dispatch(resetInput());
      return fulfillWithValue("success");
    } catch (err) {
      const error: Error = err as Error;
      return rejectWithValue(error.message);
    }
  }
);

export const loadDailyPuzzle = createAsyncThunk(
  "game/loadDaily",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const GET_URL =
        process.env.EXPO_PUBLIC_API_URL +
        `v2/puzzle/daily?offset=${getPuzzleIndexForDate(new Date())}`;
      const response = await fetch(GET_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) throw new Error("Error while loading puzzles");
      const bytes = AES.decrypt(
        data.puzzles,
        process.env.EXPO_PUBLIC_API_KEY || ""
      );
      const originalText = bytes.toString(enc);
      return fulfillWithValue(JSON.parse(originalText));
    } catch (err) {
      const error: Error = err as Error;
      return rejectWithValue(error.message);
    }
  }
);

export const loadPuzzleById = createAsyncThunk(
  "game/loadPuzzle",
  async (id: number, { fulfillWithValue, rejectWithValue }) => {
    try {
      const GET_URL =
        process.env.EXPO_PUBLIC_API_URL + `v2/puzzle/load?id=${id}`;
      const response = await fetch(GET_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) throw new Error("Error while loading puzzles");
      const bytes = AES.decrypt(
        data.puzzle,
        process.env.EXPO_PUBLIC_API_KEY || ""
      );
      const originalText = bytes.toString(enc);
      return fulfillWithValue(JSON.parse(originalText));
    } catch (err) {
      const error: Error = err as Error;
      return rejectWithValue(error.message);
    }
  }
);

export const loadArchive = createAsyncThunk(
  "game/loadArchive",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const GET_URL =
        process.env.EXPO_PUBLIC_API_URL +
        `v2/puzzle/load-archive?offset=${getPuzzleIndexForDate(new Date())}`;
      const response = await fetch(GET_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) throw new Error("Error while loading archive preview");
      const bytes = AES.decrypt(
        data.archive,
        process.env.EXPO_PUBLIC_API_KEY || ""
      );
      const originalText = bytes.toString(enc);
      return fulfillWithValue(JSON.parse(originalText));
    } catch (err) {
      console.log(err);
      const error: Error = err as Error;
      return rejectWithValue(error.message);
    }
  }
);

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    toggleReviewAsked: (state) => {
      state.isReviewAsked = true;
    },
    addToSolvedStack: (state, action: PayloadAction<string[]>) => {
      state.archive[state.currentGameId].solvedStack = action.payload;
    },
    setIsSubmitting: (state, action) => {
      state.isSubmiting = action.payload;
    },
    setIsNewPlayer: (state, action: PayloadAction<boolean>) => {
      state.isNewPlayer = action.payload;
    },
    setBestStreak: (state, action: PayloadAction<number>) => {
      state.bestStreak = action.payload;
    },
    setCurrentStreak: (state, action: PayloadAction<number>) => {
      state.currentStreak = action.payload;
    },
    updateLastDailyPlay: (state, action: PayloadAction<string>) => {
      state.lastDailyWin = action.payload;
    },
    addToInput: (state, action: PayloadAction<string>) => {
      state.input = [...state.input, action.payload];
    },
    resetInput: (state) => {
      state.input = [];
    },
    setInput: (state, action) => {
      state.input = action.payload;
    },
    popInput: (state) => {
      if (state.input.length < 1) return;
      state.input = state.input.slice(0, state.input.length - 1);
    },
    setCurrentGame: (state, action) => {
      if (action.payload in state.archive) {
        state.currentGameId = action.payload;
      }
    },
    decreasonator: (state, action) => {
      state.archive[action.payload.id1].pieces[action.payload.id2].number -= 1;
    },
    shufflePieces: (state) => {
      // state.archive[state.currentGameIdx].pieces = shuffleArray(state.archive[state.currentGameIdx].pieces) as Piece[];
      state.archive[state.currentGameId].pieces = specialShuffle(
        state.archive[state.currentGameId].pieces.slice(),
        state.archive[state.currentGameId].solvedStack.slice()
      );
    },
    addToFound: (state, action: PayloadAction<string>) => {
      state.archive[state.currentGameId].foundWords = [
        action.payload,
        ...state.archive[state.currentGameId].foundWords,
      ];
    },
    addToBonusFound: (state, action) => {
      state.archive[state.currentGameId].foundBonusWords = [
        action.payload,
        ...state.archive[state.currentGameId].foundBonusWords,
      ];
    },
    setBubble: (state, action: PayloadAction<MessageBubble | null>) => {
      state.messageBubble = action.payload;
    },
    setHideLabels: (state, action) => {
      state.hideLabels = action.payload;
    },
    debugFiller: (state) => {
      state.archive[state.currentGameId].foundWords =
        state.archive[state.currentGameId].words;
    },
    setGroupBy: (state, action: PayloadAction<"order" | "length">) => {
      state.groupBy = action.payload;
    },
    consumeHint: (state) => {
      state.archive[state.currentGameId].hintsLeft =
        state.archive[state.currentGameId].hintsLeft - 1;
    },
    refillHintsLeft: (state, action: PayloadAction<number>) => {
      state.archive[state.currentGameId].hintsLeft =
        state.archive[state.currentGameId].hintsLeft + action.payload;
    },
    triggerShare: (state) => {
      state.archive[state.currentGameId].shareUsed = true;
    },
    setStarAchieved: (state, action: PayloadAction<number>) => {
      state.archive[state.currentGameId].starAchieved = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadDailyPuzzle.pending, (state) => {
      state.puzzleLoading = true;
    });
    builder.addCase(loadDailyPuzzle.rejected, (state) => {
      state.puzzleLoading = false;
    });
    builder.addCase(
      loadDailyPuzzle.fulfilled,
      (state, action: PayloadAction<IPuzzle[]>) => {
        action.payload.forEach((e) => {
          state.archive[e.id] = {
            id: e.id,
            solution: e.words,
            words: Object.keys(e.words),
            bonusWords: e.optionalWords,
            pieces: syncPieces(
              e.board,
              e.words,
              state.archive[e.id]?.foundWords
            ),
            x5: e.x5,
            difficulty: e.difficulty,
            version: e.version,
            foundBonusWords:
              state.archive[e.id]?.foundBonusWords.filter(
                (i) => e.optionalWords.includes(i) || e.x5 === i
              ) || [],
            foundWords:
              state.archive[e.id]?.foundWords.filter((i) =>
                Object.keys(e.words).includes(i)
              ) || [],
            solvedStack: state.archive[e.id]?.solvedStack || [],
            hintsLeft: state.archive[e.id]?.hintsLeft || 3,
            shareUsed: state.archive[e.id]?.shareUsed || false,
            starAchieved: state.archive[e.id]?.starAchieved || 0,
          };
        });
        state.currentGameId = action.payload.slice(-1)[0].id;
        state.input = [];
        state.messageBubble = null;
        state.puzzleLoading = false;
      }
    );
    builder.addCase(loadPuzzleById.pending, (state) => {
      state.puzzleLoading = true;
    });
    builder.addCase(loadPuzzleById.rejected, (state) => {
      state.puzzleLoading = false;
    });
    builder.addCase(
      loadPuzzleById.fulfilled,
      (state, action: PayloadAction<IPuzzle>) => {
        state.archive[action.payload.id] = {
          id: action.payload.id,
          solution: action.payload.words,
          words: Object.keys(action.payload.words),
          bonusWords: action.payload.optionalWords,
          pieces: syncPieces(
            action.payload.board,
            action.payload.words,
            state.archive[action.payload.id]?.foundWords
          ),
          x5: action.payload.x5,
          difficulty: action.payload.difficulty,
          version: action.payload.version,
          solvedStack: state.archive[action.payload.id]?.solvedStack || [],
          hintsLeft: state.archive[action.payload.id]?.hintsLeft || 3,
          shareUsed: state.archive[action.payload.id]?.shareUsed || false,
          foundBonusWords:
            state.archive[action.payload.id]?.foundBonusWords.filter(
              (i) =>
                action.payload.optionalWords.includes(i) ||
                action.payload.x5 === i
            ) || [],
          foundWords:
            state.archive[action.payload.id]?.foundWords.filter((i) =>
              Object.keys(action.payload.words).includes(i)
            ) || [],
          starAchieved: state.archive[action.payload.id]?.starAchieved || 0,
        };
        state.currentGameId = action.payload.id;
        state.input = [];
        state.messageBubble = null;
        state.puzzleLoading = false;
      }
    );
    builder.addCase(submit.pending, (state) => {
      state.isSubmiting = true;
    });
    builder.addCase(submit.rejected, (state) => {
      state.isSubmiting = false;
    });
    builder.addCase(submit.fulfilled, (state) => {
      state.isSubmiting = false;
    });
    builder.addCase(loadArchive.pending, (state) => {
      state.archiveLoading = true;
    });
    builder.addCase(loadArchive.rejected, (state) => {
      state.archiveLoading = false;
    });
    builder.addCase(
      loadArchive.fulfilled,
      (state, action: PayloadAction<ArchivePreview[]>) => {
        state.archivePreview = action.payload;
        state.archiveLoading = false;
      }
    );
  },
});

// Action creators are generated for each case reducer function
export const {
  addToBonusFound,
  setGroupBy,
  toggleReviewAsked,
  addToSolvedStack,
  setIsSubmitting,
  debugFiller,
  setHideLabels,
  decreasonator,
  setIsNewPlayer,
  setBestStreak,
  setCurrentStreak,
  updateLastDailyPlay,
  setCurrentGame,
  addToInput,
  resetInput,
  shufflePieces,
  addToFound,
  setBubble,
  setInput,
  popInput,
  consumeHint,
  refillHintsLeft,
  triggerShare,
  setStarAchieved,
} = gameSlice.actions;

export default gameSlice.reducer;

export const GamePieces = (state: RootState) => {
  if (!(state.game.currentGameId in state.game.archive)) return [];
  return state.game.archive[state.game.currentGameId].pieces;
};

export const GameFoundWords = (state: RootState) => {
  if (!(state.game.currentGameId in state.game.archive)) return [];
  return state.game.archive[state.game.currentGameId].foundWords;
};

export const GameAllWords = (state: RootState) => {
  if (!(state.game.currentGameId in state.game.archive)) return [];
  return state.game.archive[state.game.currentGameId].words;
};

export const GameFoundBonus = (state: RootState) => {
  if (!(state.game.currentGameId in state.game.archive)) return [];
  return state.game.archive[state.game.currentGameId].foundBonusWords;
};

export const GameAllBonus = (state: RootState) => {
  if (!(state.game.currentGameId in state.game.archive)) return [];
  return state.game.archive[state.game.currentGameId].bonusWords;
};

export const GameIsOver = (state: RootState) => {
  if (!(state.game.currentGameId in state.game.archive)) return false;
  return (
    state.game.archive[state.game.currentGameId].foundWords.length ===
    state.game.archive[state.game.currentGameId].words.length
  );
};

export const HintsLeft = (state: RootState) => {
  if (!(state.game.currentGameId in state.game.archive)) return 0;
  return state.game.archive[state.game.currentGameId].hintsLeft;
};

export const DailyWord = (state: RootState) => {
  if (!(state.game.currentGameId in state.game.archive)) return "";
  return state.game.archive[state.game.currentGameId].x5;
};

export const GameSolutions = (state: RootState) => {
  if (!(state.game.currentGameId in state.game.archive)) return {};
  return state.game.archive[state.game.currentGameId].solution;
};

export const ShareUsed = (state: RootState) => {
  if (!(state.game.currentGameId in state.game.archive)) return false;
  return state.game.archive[state.game.currentGameId].shareUsed;
};
